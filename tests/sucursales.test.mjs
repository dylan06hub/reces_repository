import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const source = await readFile(new URL('../src/hooks/useSucursales.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source
  .replace("import { useEffect, useState } from 'react'", '')
  .replace("import { apiFetch } from '../api/client'", 'const apiFetch = (...args: unknown[]) => globalThis.sucursalesFetch(...args)'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText
const { loadSucursales } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)

test('consulta solo activas, recorre las páginas y conserva los datos de la API', async () => {
  const sucursal = {
    id: 1, nombre: 'Centro', ciudad: 'Trelew', direccion: 'Calle 123',
    telefono: '2801234567', horario: 'Lunes a sábados: 9 a 13',
  }
  const paths = []
  globalThis.sucursalesFetch = async (path, options) => {
    assert.equal(options.auth, false)
    paths.push(path)
    return paths.length === 1
      ? { results: [sucursal], next: 'http://api.test/api/sucursales/?activa=true&page=2' }
      : { results: [{ ...sucursal, id: 2, horario: '', telefono: '' }], next: null }
  }
  const result = await loadSucursales()
  assert.equal(paths[0], '/sucursales/?activa=true')
  assert.equal(paths[1], 'http://api.test/api/sucursales/?activa=true&page=2')
  assert.equal(result.length, 2)
  assert.deepEqual(result[0], sucursal)
  assert.equal(result[1].horario, '')
})

test('sin sucursales publicadas devuelve una lista vacía', async () => {
  globalThis.sucursalesFetch = async () => ({ results: [], next: null })
  assert.deepEqual(await loadSucursales(), [])
})

test('una falla posterior rechaza la carga sin devolver información parcial', async () => {
  let calls = 0
  globalThis.sucursalesFetch = async () => {
    if (++calls === 2) throw new Error('API 503')
    return { results: [{ id: 1 }], next: '/sucursales/?activa=true&page=2' }
  }
  await assert.rejects(loadSucursales(), /API 503/)
})
