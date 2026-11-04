import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const source = await readFile(new URL('../src/api/productPayload.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText
const { buildProductBody } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)
const form = {
  name: ' Asado ', price: '1500.50', previousPrice: '', offer: false,
  description: ' Corte fresco ', image: 'http://api.test/media/productos/corte.png',
}

test('editar sin archivo omite los campos de imagen para conservarla', () => {
  const payload = JSON.parse(buildProductBody(form, null, false))
  assert.equal(payload.nombre, 'Asado')
  assert.equal(payload.precio, 1500.5)
  assert.equal(payload.descripcion, 'Corte fresco')
  assert.equal(payload.previousPrice, null)
  assert.equal(Object.hasOwn(payload, 'imagen'), false)
  assert.equal(Object.hasOwn(payload, 'imagen_upload'), false)
})

test('quitar una imagen envía null explícito', () => {
  const payload = JSON.parse(buildProductBody(form, null, true))
  assert.equal(payload.imagen_upload, null)
  assert.equal(Object.hasOwn(payload, 'imagen'), false)
})

test('subir o reemplazar una imagen utiliza multipart y el archivo seleccionado', () => {
  const file = new File(['imagen'], 'corte.png', { type: 'image/png' })
  const body = buildProductBody(form, file, false)
  assert.ok(body instanceof FormData)
  assert.equal(body.get('imagen_upload'), file)
  assert.equal(body.get('precio'), '1500.5')
  assert.equal(body.get('offer'), 'false')
  assert.equal(body.has('imagen'), false)
  // Vacío expresa null en multipart y permite limpiar el precio anterior al editar.
  assert.equal(body.get('previousPrice'), '')
})

test('un nuevo archivo tiene prioridad sobre una eliminación anterior', () => {
  const file = new File(['imagen'], 'nuevo.png', { type: 'image/png' })
  const body = buildProductBody({ ...form, offer: true, previousPrice: '1800.75' }, file, true)
  assert.equal(body.get('imagen_upload'), file)
  assert.equal(body.get('previousPrice'), '1800.75')
  assert.equal(body.get('offer'), 'true')
})
