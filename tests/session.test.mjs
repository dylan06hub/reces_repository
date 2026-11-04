import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const source = await readFile(new URL('../src/api/client.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source.replace('import.meta.env.VITE_API_URL', "'http://api.test/api'"), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText
const sharedLocks = navigator.locks
let moduleId = 0
async function setup({ storage = new Map([['reces-access', 'a0'], ['reces-refresh', 'r0']]), locks } = {}) {
  Object.defineProperty(globalThis, 'navigator', { value: { locks }, configurable: true })
  const events = new EventTarget()
  globalThis.window = {
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: key => storage.delete(key),
    },
    dispatchEvent: event => events.dispatchEvent(event),
  }
  const client = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}#${moduleId++}`)
  return { storage, events, ...client }
}
const json = (body, status = 200) => new Response(JSON.stringify(body), { status })

test('guarda ambos tokens durante renovaciones consecutivas', async () => {
  const c = await setup()
  const refreshes = []
  let expired = 'a0'
  globalThis.fetch = async (url, options) => {
    if (url.endsWith('/auth/token/refresh/')) {
      refreshes.push(JSON.parse(options.body).refresh)
      const n = refreshes.length
      return json({ access: `a${n}`, refresh: `r${n}` })
    }
    return options.headers.Authorization === `Bearer ${expired}` ? json({}, 401) : json({ ok: true })
  }
  await c.apiFetch('/productos/')
  expired = 'a1'
  await c.apiFetch('/productos/')
  assert.deepEqual(refreshes, ['r0', 'r1'])
  assert.equal(c.storage.get('reces-refresh'), 'r2')
})

test('solicitudes concurrentes y un 401 tardío reutilizan la renovación', async () => {
  const c = await setup()
  let refreshes = 0
  let releaseLate
  const late = new Promise(resolve => { releaseLate = resolve })
  globalThis.fetch = async (url, options) => {
    if (url.endsWith('/auth/token/refresh/')) {
      refreshes++
      return json({ access: 'a1', refresh: 'r1' })
    }
    if (options.headers.Authorization === 'Bearer a0') {
      if (url.endsWith('/late/')) await late
      return json({}, 401)
    }
    return json({ ok: true })
  }
  const delayed = c.apiFetch('/late/')
  await Promise.all([c.apiFetch('/one/'), c.apiFetch('/two/')])
  releaseLate()
  await delayed
  assert.equal(refreshes, 1)
})

test('refresh inválido elimina tokens y avisa al panel', async () => {
  const c = await setup()
  let ended = 0
  c.events.addEventListener(c.SESSION_ENDED_EVENT, () => ended++)
  globalThis.fetch = async () => json({}, 401)
  await assert.rejects(c.apiFetch('/productos/'))
  assert.equal(c.storage.size, 0)
  assert.equal(ended, 1)
})

test('error temporal permite intentar renovar después sin cerrar sesión', async () => {
  const c = await setup()
  let unavailable = true
  globalThis.fetch = async (url, options) => {
    if (url.endsWith('/auth/token/refresh/')) return unavailable
      ? json({}, 503) : json({ access: 'a1', refresh: 'r1' })
    return options.headers.Authorization === 'Bearer a0' ? json({}, 401) : json({ ok: true })
  }
  await assert.rejects(c.apiFetch('/productos/'))
  assert.equal(c.storage.get('reces-refresh'), 'r0')
  unavailable = false
  await c.apiFetch('/productos/')
  assert.equal(c.storage.get('reces-refresh'), 'r1')
})

test('cerrar sesión durante la renovación no restaura los tokens', async () => {
  const c = await setup()
  let resolveRefresh
  let started
  const ready = new Promise(resolve => { started = resolve })
  globalThis.fetch = async url => {
    if (url.endsWith('/auth/token/refresh/')) {
      started()
      return new Promise(resolve => { resolveRefresh = resolve })
    }
    return json({}, 401)
  }
  const request = c.apiFetch('/productos/')
  await ready
  c.clearTokens()
  resolveRefresh(json({ access: 'a1', refresh: 'r1' }))
  await assert.rejects(request)
  assert.equal(c.storage.size, 0)
})

test('sin refresh o con access renovado rechazado se termina la sesión', async () => {
  for (const missingRefresh of [true, false]) {
    const c = await setup()
    if (missingRefresh) c.storage.delete('reces-refresh')
    globalThis.fetch = async url => url.endsWith('/auth/token/refresh/')
      ? json({ access: 'a1', refresh: 'r1' }) : json({}, 401)
    await assert.rejects(c.apiFetch('/productos/'))
    assert.equal(c.storage.size, 0)
  }
})

test('login no adjunta tokens viejos ni intenta renovarlos', async () => {
  const c = await setup()
  let calls = 0
  globalThis.fetch = async (url, options) => {
    calls++
    assert.ok(url.endsWith('/auth/token/'))
    assert.equal(options.headers.Authorization, undefined)
    return json({ access: 'new', refresh: 'new-refresh' })
  }
  await c.login('admin', 'password')
  assert.equal(calls, 1)
  assert.equal(c.storage.get('reces-refresh'), 'new-refresh')
})


test('catálogo y sucursales públicos cargan con tokens vencidos sin renovar ni cerrar la sesión', async () => {
  const c = await setup()
  c.storage.set('reces-access', 'expired')
  c.storage.set('reces-refresh', 'invalid')
  const calls = []
  let ended = 0
  c.events.addEventListener(c.SESSION_ENDED_EVENT, () => ended++)
  globalThis.fetch = async (url, options) => {
    calls.push(url)
    assert.equal(options.headers.Authorization, undefined)
    assert.equal(Object.hasOwn(options, 'auth'), false)
    return json({ results: [{ id: 1 }] })
  }
  for (const path of ['/productos/?activo=true', '/sucursales/?activa=true']) {
    const response = await c.apiFetch(path, { auth: false })
    assert.equal(response.results[0].id, 1)
  }
  assert.equal(calls.length, 2)
  assert.equal(c.storage.get('reces-access'), 'expired')
  assert.equal(c.storage.get('reces-refresh'), 'invalid')
  assert.equal(ended, 0)
})

test('un 401 en una consulta pública no intenta renovar ni borra los tokens del panel', async () => {
  const c = await setup()
  let calls = 0
  globalThis.fetch = async () => { calls++; return json({}, 401) }
  await assert.rejects(c.apiFetch('/productos/', { auth: false }), error => error.status === 401)
  assert.equal(calls, 1)
  assert.equal(c.storage.get('reces-refresh'), 'r0')
})


// Dos módulos representan pestañas distintas con storage y Web Locks compartidos.
test('dos pestañas comparten una renovación y ambas completan su solicitud', async () => {
  const locks = sharedLocks
  const a = await setup({ locks })
  const b = await setup({ storage: a.storage, locks })
  let refreshes = 0
  globalThis.fetch = async (url, options) => {
    if (url.endsWith('/auth/token/refresh/')) {
      refreshes++
      return json({ access: 'a1', refresh: 'r1' })
    }
    return options.headers.Authorization === 'Bearer a0' ? json({}, 401) : json({ ok: true })
  }
  const results = await Promise.all([a.apiFetch('/one/'), b.apiFetch('/two/')])
  assert.deepEqual(results, [{ ok: true }, { ok: true }])
  assert.equal(refreshes, 1)
  assert.equal(a.storage.get('reces-refresh'), 'r1')
})

test('cerrar sesión en otra pestaña durante la renovación no restaura la sesión', async () => {
  const locks = sharedLocks
  const a = await setup({ locks })
  const b = await setup({ storage: a.storage, locks })
  let started, finish
  const ready = new Promise(resolve => { started = resolve })
  let refreshes = 0
  globalThis.fetch = async url => {
    if (url.endsWith('/auth/token/refresh/')) {
      refreshes++
      if (refreshes > 1) return json({ access: 'a2', refresh: 'r2' })
      started()
      return new Promise(resolve => { finish = resolve })
    }
    return json({}, 401)
  }
  const requests = Promise.allSettled([a.apiFetch('/one/'), b.apiFetch('/two/')])
  await ready
  b.clearTokens()
  finish(json({ access: 'a1', refresh: 'r1' }))
  const results = await requests
  assert.ok(results.every(result => result.status === 'rejected'))
  assert.equal(refreshes, 1)
  assert.equal(a.storage.size, 0)
})

test('una renovación fallida libera el lock para la otra pestaña', async () => {
  const locks = sharedLocks
  const a = await setup({ locks })
  const b = await setup({ storage: a.storage, locks })
  let refreshes = 0
  globalThis.fetch = async (url, options) => {
    if (url.endsWith('/auth/token/refresh/')) {
      refreshes++
      return refreshes === 1 ? json({}, 503) : json({ access: 'a1', refresh: 'r1' })
    }
    return options.headers.Authorization === 'Bearer a0' ? json({}, 401) : json({ ok: true })
  }
  const results = await Promise.allSettled([a.apiFetch('/one/'), b.apiFetch('/two/')])
  assert.equal(results[0].status, 'rejected')
  assert.deepEqual(results[1], { status: 'fulfilled', value: { ok: true } })
  assert.equal(refreshes, 2)
  assert.equal(a.storage.get('reces-refresh'), 'r1')
})

test('un refresh inválido termina la sesión de las pestañas sin renovaciones repetidas', async () => {
  const locks = sharedLocks
  const a = await setup({ locks })
  const b = await setup({ storage: a.storage, locks })
  let refreshes = 0
  globalThis.fetch = async url => {
    if (url.endsWith('/auth/token/refresh/')) refreshes++
    return json({}, 401)
  }
  const results = await Promise.allSettled([a.apiFetch('/one/'), b.apiFetch('/two/')])
  assert.ok(results.every(result => result.status === 'rejected'))
  assert.equal(refreshes, 1)
  assert.equal(a.storage.size, 0)
})
