import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const source = await readFile(new URL('../src/utils/filterProducts.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText
const { filterProducts } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)
const catalog = [{ name: 'Vacío premium' }, { name: 'Asado de tira' }, { name: 'Entraña selecta' }]

test('busca por nombre parcial sin distinguir mayúsculas, tildes ni espacios externos', () => {
  assert.deepEqual(filterProducts(catalog, '  VACIO  '), [catalog[0]])
  assert.deepEqual(filterProducts(catalog, 'ASÁDO'), [catalog[1]])
  assert.deepEqual(filterProducts(catalog, 'entrana'), [catalog[2]])
  assert.deepEqual(filterProducts(catalog, 'vaci\u0301o'), [catalog[0]])
})

test('sin coincidencias devuelve vacío y limpiar restaura el catálogo sin modificarlo', () => {
  assert.deepEqual(filterProducts(catalog, 'pollo'), [])
  assert.equal(filterProducts(catalog, ''), catalog)
  assert.equal(filterProducts(catalog, '   '), catalog)
  assert.equal(catalog.length, 3)
  assert.deepEqual(filterProducts([], 'asado'), [])
})
