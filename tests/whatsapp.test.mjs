import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const source = await readFile(new URL('../src/utils/whatsapp.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText
const { getWhatsAppUrl } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)

test('consulta y footer comparten el destino de WhatsApp', () => {
  const general = new URL(getWhatsAppUrl())
  const product = new URL(getWhatsAppUrl('Vacío'))
  assert.equal(general.origin, 'https://wa.me')
  assert.match(general.pathname, /^\/\d+$/)
  assert.equal(general.search, '')
  assert.equal(product.pathname, general.pathname)
})

test('el nombre completo se conserva como texto sin alterar la URL', () => {
  const name = 'Vacío & asado #1? <script>alert("x")</script> + 2×1'
  const result = getWhatsAppUrl(name)
  const url = new URL(result)
  assert.equal(url.searchParams.get('text'), `Hola, quiero consultar por: ${name}`)
  assert.equal(url.searchParams.size, 1)
  assert.equal(url.hash, '')
  assert.equal(result.includes('<script>'), false)
})
