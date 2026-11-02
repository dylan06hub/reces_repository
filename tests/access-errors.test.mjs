import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const compile = source => ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText
const moduleUrl = source => `data:text/javascript;base64,${Buffer.from(compile(source)).toString('base64')}`
const clientUrl = moduleUrl((await readFile(new URL('../src/api/client.ts', import.meta.url), 'utf8'))
  .replace('import.meta.env.VITE_API_URL', "'http://api.test/api'"))
const { ApiError, apiFetch, getErrorMessage, login } = await import(clientUrl)
const { getAdminProfile } = await import(moduleUrl(
  (await readFile(new URL('../src/api/profile.ts', import.meta.url), 'utf8'))
    .replace("from './client'", `from '${clientUrl}'`),
))
globalThis.window = {
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  dispatchEvent: () => {},
}
const json = (body, status = 200) => new Response(JSON.stringify(body), { status })

test('solo un perfil con permiso explícito permite administrar', async () => {
  const controller = new AbortController()
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'http://api.test/api/usuarios/me/')
    assert.equal(options.signal, controller.signal)
    return json({ id: 1, username: 'staff', can_manage_catalog: true })
  }
  const profile = await getAdminProfile(controller.signal)
  assert.equal(profile.username, 'staff')
})

test('cliente, permiso ausente o valor no booleano no habilitan el panel', async () => {
  for (const permission of [false, undefined, 'true']) {
    globalThis.fetch = async () => json({ id: 1, can_manage_catalog: permission })
    await assert.rejects(getAdminProfile(), error => {
      assert.equal(error.status, 403)
      assert.match(getErrorMessage(error, 'fallback'), /no tiene permisos/)
      return true
    })
  }
})

test('perfil sin autenticación conserva el estado 401', async () => {
  globalThis.fetch = async () => json({ detail: 'Debés iniciar sesión.' }, 401)
  await assert.rejects(getAdminProfile(), error => {
    assert.ok(error instanceof ApiError)
    assert.equal(error.status, 401)
    return true
  })
})

test('el cliente conserva errores por campo y los muestra con nombres legibles', async () => {
  const details = {
    previousPrice: ['Debe ser mayor al precio actual.'],
    imagen_upload: ['El archivo enviado no es una imagen válida.'],
  }
  globalThis.fetch = async () => json(details, 400)
  await assert.rejects(apiFetch('/productos/'), error => {
    assert.deepEqual(error.details, details)
    assert.equal(getErrorMessage(error, 'fallback'),
      'Precio anterior: Debe ser mayor al precio actual. Imagen: El archivo enviado no es una imagen válida.')
    return true
  })
})

test('contacto conserva las validaciones y el aviso de límite de envíos', async () => {
  for (const [status, details, expected] of [
    [400, { mensaje: ['El mensaje debe tener al menos 10 caracteres.'] }, 'Mensaje: El mensaje debe tener al menos 10 caracteres.'],
    [429, { detail: 'Intentá nuevamente en 60 segundos.' }, 'Intentá nuevamente en 60 segundos.'],
  ]) {
    globalThis.fetch = async () => json(details, status)
    await assert.rejects(apiFetch('/contacto/'), error => {
      assert.equal(getErrorMessage(error, 'fallback'), expected)
      return true
    })
  }
})

test('errores de permisos y generales mantienen mensajes sin códigos internos', () => {
  assert.equal(getErrorMessage(new ApiError(403, { detail: 'No tenés permiso.', code: 'denied' }), 'fallback'), 'No tenés permiso.')
  assert.equal(getErrorMessage(new ApiError(400, { non_field_errors: ['Revisá los datos.'] }), 'fallback'), 'Revisá los datos.')
})

test('respuestas HTML, errores internos y fallas de red usan un mensaje seguro', async () => {
  for (const response of [new Response('<html>Error interno</html>', { status: 502 }), json({ detail: 'Detalle interno' }, 500)]) {
    globalThis.fetch = async () => response
    await assert.rejects(apiFetch('/productos/'), error => {
      assert.ok(error instanceof ApiError)
      assert.equal(getErrorMessage(error, 'No pudimos conectar.'), 'No pudimos conectar.')
      return true
    })
  }
  assert.equal(getErrorMessage(new TypeError('Failed to fetch'), 'Sin conexión.'), 'Sin conexión.')
})

test('login conserva el código HTTP para distinguir credenciales de fallas de servidor', async () => {
  globalThis.fetch = async () => json({ detail: 'No estás autenticado.' }, 401)
  await assert.rejects(login('cliente', 'incorrecta'), error => error instanceof ApiError && error.status === 401)
})
