import { useEffect, useState } from 'react'

const slides = [
  {
    image: '/img/carne3.jpeg',
    tag: 'SÚPER PROMO EXCLUSIVA ONLINE',
    title: 'OFERTAS DE LA SEMANA',
    subtitle: '2×1 en Cortes Selectos de Ternera',
    text: 'Llevá la mejor calidad para tu parrilla. Cortes seleccionados y frescos para disfrutar en cada ocasión.',
  },
  {
    image: '/img/carne2.jpeg',
    tag: 'CALIDAD QUE SE NOTA',
    title: 'CORTES FRESCOS',
    subtitle: 'Seleccionados para tu mesa',
    text: 'Elegimos cuidadosamente cada corte para ofrecerte sabor, calidad y frescura en cada compra.',
  },
  {
    image: '/img/carne1.jpeg',
    tag: 'ESPECIAL PARA EL FINDE',
    title: 'EL ASADO EMPIEZA ACÁ',
    subtitle: 'Todo lo que necesitás para compartir',
    text: 'Prepará un asado inolvidable con nuestros mejores cortes y compartí momentos especiales con los que más querés.',
  },
]

const Carrusel = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const anterior = () => {
    setActiveSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    )
  }

  const siguiente = () => {
    setActiveSlide(
      (prev) => (prev + 1) % slides.length
    )
  }

  return (
    <section className="carrusel">

      <div className="carrusel-fondo">

        <div className="carrusel-contenido">

          <span className="carrusel-etiqueta">
            🔥 {slides[activeSlide].tag}
          </span>

          <h1>
            {slides[activeSlide].title}
          </h1>

          <h2>
            {slides[activeSlide].subtitle}
          </h2>

          <p>
            {slides[activeSlide].text}
          </p>

          <div className="carrusel-botones">

            <a
              href="#productos"
              className="carrusel-boton carrusel-boton-principal"
            >
              Ver Todos los Cortes
            </a>

            <a
              href="#contacto"
              className="carrusel-boton carrusel-boton-secundario"
            >
              ↑ Sucursal Más Cercana
            </a>

          </div>

        </div>

        <div className="carrusel-imagen-contenedor">
          <img
            src={slides[activeSlide].image}
            alt={slides[activeSlide].title}
            className="carrusel-imagen"
          />
        </div>

      </div>

      <button
        className="carrusel-flecha carrusel-anterior"
        onClick={anterior}
        aria-label="Imagen anterior"
      >
        ‹
      </button>

      <button
        className="carrusel-flecha carrusel-siguiente"
        onClick={siguiente}
        aria-label="Imagen siguiente"
      >
        ›
      </button>

      <div className="carrusel-puntos">

        {slides.map((_, index) => (
          <button
            key={index}
            className={`carrusel-punto ${
              activeSlide === index ? 'activo' : ''
            }`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Ir al carrusel ${index + 1}`}
          />
        ))}

      </div>

    </section>
  )
}

export default Carrusel