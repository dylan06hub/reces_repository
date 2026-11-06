import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const source = await readFile(new URL('../src/hooks/useProducts.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source
  .replace("import { useEffect, useState } from 'react'", '')
  .replace("import { apiFetch } from '../api/client'", 'const apiFetch = (...args: unknown[]) => globalThis.catalogFetch(...args)'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText
const { loadProducts, mapProducto } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)
const product = id => ({
  id, nombre: `Producto ${id}`, descripcion: 'Corte seleccionado', precio: '1250.50',
  previousPrice: '1500.00', offer: true, imagen: null, activo: true,
})

test('carga las 16 entradas de varias páginas y solicita solo activos', async () => {
  const paths = []
  globalThis.catalogFetch = async (path, options) => {
    assert.equal(options.auth, false)
    paths.push(path)
    const second = path.startsWith('http')
    return {
      results: Array.from({ length: second ? 6 : 10 }, (_, i) => product(i + (second ? 11 : 1))),
      next: second ? null : 'http://api.test/api/productos/?activo=true&page=2',
    }
  }
  const catalog = await loadProducts()
  assert.equal(catalog.length, 16)
  assert.equal(paths[0], '/productos/?activo=true')
  assert.equal(catalog[15].id, 16)
  assert.equal(catalog[0].price, 1250.5)
  assert.equal(catalog[0].previousPrice, 1500)
  assert.equal(catalog[0].image, '/img/carne2.jpeg')
})

test('un catálogo vacío se devuelve vacío, sin productos de ejemplo', async () => {
  globalThis.catalogFetch = async () => ({ results: [], next: null })
  assert.deepEqual(await loadProducts(), [])
})

test('si falla una página posterior rechaza la carga completa', async () => {
  let calls = 0
  globalThis.catalogFetch = async () => {
    if (++calls === 2) throw new Error('API 503')
    return { results: [product(1)], next: '/productos/?activo=true&page=2' }
  }
  await assert.rejects(loadProducts(), /API 503/)
})

test('una nueva carga puede recuperarse después de un error', async () => {
  globalThis.catalogFetch = async () => { throw new Error('Sin conexión') }
  await assert.rejects(loadProducts(), /Sin conexión/)
  globalThis.catalogFetch = async () => ({ results: [product(3)], next: null })
  assert.equal((await loadProducts())[0].id, 3)
})

test('propaga la cancelación y no continúa cargando páginas', async () => {
  const controller = new AbortController()
  let calls = 0
  globalThis.catalogFetch = async (_path, { signal }) => {
    assert.equal(signal, controller.signal)
    calls++
    if (calls === 1) {
      controller.abort()
      return { results: [product(1)], next: '/productos/?page=2' }
    }
    signal.throwIfAborted()
  }
  await assert.rejects(loadProducts(controller.signal), { name: 'AbortError' })
  assert.equal(calls, 1)
})

test('las imágenes públicas son estables por producto y existen en public', async () => {
  for (let id = 1; id <= 24; id++) {
    const item = { ...product(id), imagen: 'https://api.test/media/anterior.png' }
    const mapped = mapProducto(item)
    assert.equal(mapped.image, `/img/carne${((id - 1) % 11) + 2}.jpeg`)
    const contents = await readFile(new URL(`../public${mapped.image}`, import.meta.url))
    assert.ok(contents.length > 0)
    assert.equal(mapProducto(item).image, mapped.image)
  }
})
