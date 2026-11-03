import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const slides = [
  {
    image: '/img/carne3.jpeg',
    alt: 'Chorizos frescos en el mostrador de Reses',
    label: 'Ofertas',
    title: 'Ofertas de la semana',
    subtitle: '2×1 en cortes selectos de ternera',
    text: 'Llevá la mejor calidad para tu parrilla. Cortes seleccionados y frescos para disfrutar en cada ocasión.',
  },
  {
    image: '/img/carne2.jpeg',
    alt: 'Selección de carnes frescas de Reses',
    label: 'Cortes frescos',
    title: 'Frescura en cada corte',
    subtitle: 'Seleccionados para tu mesa',
    text: 'Elegimos cuidadosamente cada corte para ofrecerte sabor, calidad y frescura en cada compra.',
  },
  {
    image: '/img/carne1.jpeg',
    alt: 'Cortes de carne para preparar a la parrilla',
    label: 'Para el asado',
    title: 'El asado empieza acá',
    subtitle: 'Todo lo que necesitás para compartir',
    text: 'Prepará un asado con nuestros mejores cortes y compartí momentos especiales con los que más querés.',
  },
]

const Carrusel = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(() =>
    typeof window === 'undefined' || !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )
  const [isHovered, setIsHovered] = useState(false)
  const slide = slides[activeSlide]

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pauseForReducedMotion = (event: MediaQueryListEvent) => {
      if (event.matches) setIsPlaying(false)
    }
    media.addEventListener('change', pauseForReducedMotion)
    return () => media.removeEventListener('change', pauseForReducedMotion)
  }, [])

  useEffect(() => {
    if (!isPlaying || isHovered) return
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [isPlaying, isHovered])

  return (
    <section
      className="carrusel"
      aria-label="Selección de Reses"
      aria-roledescription="carrusel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsPlaying(false)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPlaying(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        }
      }}
    >
      <div className="carrusel-fondo" aria-live={isPlaying && !isHovered ? 'off' : 'polite'} aria-atomic="true">
        <div className="carrusel-contenido" key={slide.title}>
          <h1>{slide.title}</h1>
          <p className="carrusel-subtitulo">{slide.subtitle}</p>
          <p className="carrusel-descripcion">{slide.text}</p>
          <div className="carrusel-botones">
            <a href="#productos" className="carrusel-boton carrusel-boton-principal">
              Ver todos los cortes <span aria-hidden="true">↗</span>
            </a>
            <Link to="/contacto" className="carrusel-boton-secundario">Encontrá tu sucursal</Link>
          </div>
        </div>
        <div className="carrusel-imagen-contenedor">
          <img key={slide.image} src={slide.image} alt={slide.alt} className="carrusel-imagen" fetchPriority="high" />
        </div>
      </div>

      <div className="carrusel-controles">
        <div className="carrusel-selector" aria-label="Elegir contenido">
          {slides.map((item, index) => (
            <button
              type="button"
              key={item.image}
              className={`carrusel-opcion ${activeSlide === index ? 'activo' : ''}`}
              onClick={() => setActiveSlide(index)}
              aria-current={activeSlide === index ? 'true' : undefined}
              aria-label={`Mostrar: ${item.label}`}
            >
              <span className="carrusel-indicador" aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carrusel
