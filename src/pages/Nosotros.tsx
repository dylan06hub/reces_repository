// Página institucional con historia, estadísticas y valores de la empresa.
import Button from '../components/Button'
import Card from '../components/Card'

const stats = [
  { value: '40+', label: 'años de oficio' },
  { value: '100%', label: 'trazabilidad' },
  { value: '12k', label: 'familias nos eligen' }
]

const values = [
  {
    number: '01',
    title: 'Calidad',
    text: 'El estándar que guía cada elección.'
  },
  {
    number: '02',
    title: 'Tradición',
    text: 'Experiencia que se transmite con orgullo.'
  },
  {
    number: '03',
    title: 'Cadena de frío',
    text: 'Cuidado constante desde el origen.'
  }
]

export default function Nosotros() {
  return (
    <main className="nosotros-page">
      <section className="page-hero about-hero">
        <div className="hero-copy">
          <p className="eyebrow">Nuestra historia</p>
          <h1>
            Una tradición
            <br />
            <em>de sabor.</em>
          </h1>
          <p>
            Más de cuatro décadas cuidando cada corte, cada entrega y cada relación con quienes confían en nosotros.
          </p>
          <div className="hero-actions">
            <Button type="button">Ver productos</Button>
          </div>
        </div>
      </section>

      <section className="section about-story">
        <div className="about-story__intro">
          <p className="eyebrow">Reces S.R.L.</p>
          <h2>El oficio de saber elegir</h2>
        </div>

        <div className="about-story__body">
          <p>
            Somos una familia dedicada a la carne desde hace más de cuatro décadas.
            Seleccionamos cada pieza con criterio, la trabajamos con respeto y la entregamos
            en su mejor momento.
          </p>
          <p>
            Cada proceso está pensado para asegurar sabor, frescura y confianza: desde la selección del origen
            hasta la entrega final a la mesa de nuestros clientes.
          </p>
        </div>

        <div className="stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="quote">
        <p>“Saber elegir, saber servir.”</p>
      </section>

      <section className="section values">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Lo que nos define</p>
            <h2>Valores con historia</h2>
          </div>
          <p>
            Trabajamos todos los días para sostener una tradición basada en el rigor, la honestidad y el sabor.
          </p>
        </div>

        <div className="value-grid">
          {values.map((value) => (
            <Card key={value.number} className="value-card">
              <strong>{value.number}</strong>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
