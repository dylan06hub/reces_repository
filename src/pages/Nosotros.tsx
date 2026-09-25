// Página institucional con historia, estadísticas y valores de la empresa.
import { useEffect, useState } from 'react'

const stats = [
  { value: '40+', label: 'años de trayectoria' },
  { value: '100%', label: 'pasturas naturales' },
  { value: '12k', label: 'clientes felices' }
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

const values = [
  {
    icon: '✦',
    title: 'Calidad sin Compromisos',
    text: 'Seleccionamos cortes premium con controles rigurosos para asegurar sabor, textura y consistencia en cada pieza. Cada animal pasa por criterios estrictos de elección y mantenimiento para garantizar una experiencia uniforme, sabrosa y confiable en cada compra.'
  },
  {
    icon: '♡',
    title: 'Tradición Familiar',
    text: 'Mantener viva la historia del asado argentino y la atención cercana que distingue a nuestra familia. Valoramos el trato humano, la confianza de nuestros clientes y la forma en que el buen producto se comparte alrededor de la mesa.'
  },
  {
    icon: '▣',
    title: 'Cadena de Frío Express',
    text: 'Nuestros envíos y entregas se realizan en condiciones ideales para preservar la frescura desde el origen hasta tu hogar. La temperatura, la rapidez y la responsabilidad con cada entrega son pilares fundamentales en la forma en que trabajamos.'
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
            <p className="eyebrow">Desde 1985</p>
            <h1>
              Una tradición de sabor
              <br />
              y calidad en tu mesa
            </h1>

            <p>
              Fundada en las fértiles tierras de pasturas naturales, Reses S.R.L. nació con un propósito claro: redefinir la experiencia de la carne premium en el hogar. Desde el primer día, apostamos por un modelo de trabajo cercano, honesto y centrado en la calidad real del producto.
            </p>

            <p>
              Lo que comenzó hace más de cuatro décadas con un humilde emprendimiento familiar, hoy se consolida como una marca de referencia en calidad, servicio y tradición. Nuestra misión es acompañar cada mesa con cortes seleccionados, atención personalizada y un compromiso profundo con la frescura, la consistencia y la confianza de quienes nos eligen.
            </p>

            <p>
              A lo largo de los años construimos una relación cercana con productores, clientes y familias que valoran la excelencia del asado argentino. Ese vínculo, junto con una constante búsqueda de mejora, nos permite ofrecer una experiencia más cuidada, más genuina y más sabrosa en cada compra.
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
          <p className="quote-tag">Nuestra pasión cruda</p>
          <h2>Saber elegir, saber servir</h2>
          <p>
            La maduración perfecta y la trazabilidad de origen aseguran que cada bocado en tu mesa sea un testimonio vivo de la verdadera excelencia criolla. Cuidamos cada detalle del proceso, desde la selección de los animales hasta la entrega final, para que la carne no solo se vea impecable, sino que también transmita sabor, textura y autenticidad en cada preparación.
          </p>
        </div>
      </section>


      <section className="about-values">
        <div className="about-values__header">
          <p className="eyebrow">Nuestros pilares</p>
          <h2>Valores que sustentan nuestro trabajo</h2>
          <p>
            En Reses S.R.L., no solo vendemos cortes de carne; honramos un estilo de vida que valora la procedencia, el servicio y la calidad en cada detalle. Cada decisión que tomamos gira en torno a ofrecer una experiencia confiable para familias, parrilleros y amantes de la buena carne, con la atención que merece una tradición hecha con paciencia, respeto y amor por lo que hacemos.
          </p>
        </div>

        <div className="value-grid">
          {values.map((value) => (
            <article key={value.title} className="value-card">
              <div className="value-card__icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      
    </main>
  )
}
