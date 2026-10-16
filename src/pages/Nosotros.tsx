// Página institucional con historia, estadísticas y valores de la empresa.
import { useEffect, useState } from 'react'

const stats = [
  { value: '1985', label: 'año en que empezamos' },
  { value: '2', label: 'locales en Chubut' },
  { value: '40+', label: 'años detrás del mostrador' }
]

const slides = [
  {
    image: '/img/image.png',
    alt: 'Carnicería con mostrador y cortes'
  },
  {
    image: '/img/image copy.png',
    alt: 'Corte de carne premium'
  },
  {
    image: '/img/image copy 2.png',
    alt: 'Vista de carnicería moderna'
  }
]

export default function Nosotros() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length)
  }

  return (
    <main className="nosotros-page">
      <section className="about-showcase">
        <div className="about-showcase__content">
          <div className="about-copy">
            <p className="eyebrow">Trelew y Rawson</p>
            <h1>
              Carnicería de barrio,
              <br />
              con más de 40 años
            </h1>

            <p>
              Reses arrancó en 1985 como un negocio de familia. El oficio era —y sigue siendo— el mismo: elegir bien la hacienda, cortar con criterio y atender de frente, sin vueltas.
            </p>

            <p>
              Hoy tenemos local en Trelew y en Rawson. Si venís por un asado, unas milanesas o el pedido de la semana, te armamos el corte como lo necesitás. No hay receta mágica: hay mostrador, cuchillo y gente que vuelve.
            </p>

            <p>
              Trabajamos con productores de la zona y cuidamos la cadena hasta que la carne sale del local. Fresca, bien presentada y lista para llevar.
            </p>

            <div className="metrics">
              {stats.map((stat) => (
                <div key={stat.label} className="metric-item">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-carousel" aria-label="Galería de la carnicería">
            <div className="carousel-window">
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div key={slide.alt} className="carousel-slide">
                    <img src={slide.image} alt={slide.alt} />
                  </div>
                ))}
              </div>
            </div>

            <div className="carousel-nav">
              <button type="button" aria-label="Anterior imagen" onClick={goToPrevious}>
                ‹
              </button>
              <button type="button" aria-label="Siguiente imagen" onClick={goToNext}>
                ›
              </button>
            </div>

            <div className="carousel-dots" aria-label="Seleccionar imagen">
              {slides.map((slide, index) => (
                <button
                  key={slide.alt}
                  type="button"
                  className={index === activeSlide ? 'active' : ''}
                  aria-label={`Ir a la imagen ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-quote">
        <div className="about-quote__inner">
          <p className="quote-tag">En el local</p>
          <h2>El asado se arma acá</h2>
          <p>
            Te decimos qué corte rinde mejor, cuánta carne calcular y cómo pedirla. Origen conocido, maduración cuando hace falta, y el pedido listo para el fuego o para la cocina de todos los días.
          </p>
        </div>
      </section>
    </main>
  )
}
