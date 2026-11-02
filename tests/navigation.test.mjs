import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

// Ejecutar los componentes reales en Node sin agregar un runner ni dependencias.
const modules = new Map()
async function loadModule(file) {
  if (modules.has(file.href)) return modules.get(file.href)
  const source = (await readFile(file, 'utf8')).replace('import.meta.env.VITE_API_URL', "'http://api.test/api'")
  let compiled = ts.transpileModule(source, {
    fileName: file.pathname,
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText
  const imports = [...compiled.matchAll(/from\s+['"]([^'"]+)['"]/g)]
  for (const [, specifier] of imports) {
    let resolved
    if (specifier.startsWith('.')) {
      const base = new URL(specifier, file)
      const extension = /\.(tsx?|jsx?)$/.test(base.pathname) ? '' :
        /\/(App|router|pages\/|components\/)/.test(base.pathname) ? '.tsx' : '.ts'
      resolved = await loadModule(new URL(base.href + extension))
    } else {
      resolved = import.meta.resolve(specifier)
    }
    compiled = compiled.replaceAll(`'${specifier}'`, `'${resolved}'`).replaceAll(`"${specifier}"`, `"${resolved}"`)
  }
  const url = `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`
  modules.set(file.href, url)
  return url
}
const { default: App } = await import(await loadModule(new URL('../src/App.tsx', import.meta.url)))
globalThis.window = { localStorage: { getItem: () => null } }
const render = router => renderToStaticMarkup(React.createElement(RouterProvider, { router }))
const makeRouter = () => createMemoryRouter([{ path: '*', element: React.createElement(App) }])

test('las rutas cambian la página y permiten volver y avanzar', async () => {
  const router = makeRouter()
  try {
    assert.match(render(router), /LOS MEJORES CORTES DE CARNE/)
    await router.navigate('/contacto')
    assert.match(render(router), /Escribinos/)
    await router.navigate(-1)
    assert.equal(router.state.location.pathname, '/')
    await router.navigate(1)
    assert.equal(router.state.location.pathname, '/contacto')
    await router.navigate('/admin')
    assert.match(render(router), /Iniciar sesión/)
  } finally { router.dispose() }
})

test('los enlaces internos apuntan a las rutas reales y una ruta desconocida muestra 404', async () => {
  const router = makeRouter()
  try {
    const home = render(router)
    assert.match(home, /href="\/contacto"[^>]*>↑ Sucursal Más Cercana/)
    assert.match(home, /href="\/admin"/)
    await router.navigate('/no-existe')
    const missing = render(router)
    assert.match(missing, /Página no encontrada/)
    assert.doesNotMatch(missing, /LOS MEJORES CORTES DE CARNE/)
    assert.match(missing, /href="\/"[^>]*>Volver al inicio/)
  } finally { router.dispose() }
})
