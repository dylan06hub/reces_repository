import { Link } from 'react-router-dom'

export default function NotFound() {
  return <section className="section">
    <p className="eyebrow">Error 404</p>
    <h1>Página no encontrada</h1>
    <p>La dirección que buscás no existe.</p>
    <Link className="button" to="/">Volver al inicio</Link>
  </section>
}
