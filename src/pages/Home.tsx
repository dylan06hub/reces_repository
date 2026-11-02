// Página inicial con carrusel, catálogo y garantía de calidad.

import { useProducts } from '../hooks/useProducts'
import { formatPrice } from '../utils/formatPrice'
import { getWhatsAppUrl } from '../utils/whatsapp'
import Badge from '../components/Badge'
import Carrusel from '../components/Carrusel'

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 18.5L3.5 20V6.2A2.2 2.2 0 0 1 5.7 4h12.6a2.2 2.2 0 0 1 2.2 2.2v7.6a2.2 2.2 0 0 1-2.2 2.2H5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8 9.2h8M8 12.7h5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const Home = () => {
  const { catalog: products, loading, error, reload } = useProducts()

  const handleWhatsappConsult = (productName: string) => {
    window.open(getWhatsAppUrl(productName), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <main>

        {/*CARRUSEL PRINCIPAL*/}
        <Carrusel />


        {/* PRODUCTOS */}
        <section className="productos-home" id="productos">

          <div className="productos-titulo">

            <p className="productos-etiqueta">
              NUESTRA SELECCIÓN
            </p>

            <h2>
              LOS MEJORES CORTES DE CARNE
            </h2>

            <p>
              Seleccionamos nuestros mejores cortes para que disfrutes
              productos de calidad en cada ocasión.
            </p>

          </div>


          <div className="catalog-status" role="status" aria-live="polite">
            {loading && <p>Cargando productos...</p>}
            {!loading && !error && products.length === 0 && (
              <p>Por el momento no hay productos disponibles.</p>
            )}
          </div>
          {error && (
            <div className="catalog-status">
              <p className="form-message form-message--error" role="alert">{error}</p>
              <button type="button" className="button" onClick={reload}>Reintentar</button>
            </div>
          )}

          {/* GRILLA DE PRODUCTOS */}
          <div className="productos-grid" aria-busy={loading}>

            {products.map((product, index) => (

              <article
                className="producto-card"
                key={`${product.name}-${index}`}
              >

                {/* IMAGEN DEL PRODUCTO */}
                <div className="producto-imagen">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  {product.offer && (
                    <Badge>
                      OFERTA
                    </Badge>
                  )}

                </div>


                {/* INFORMACIÓN */}
                <div className="producto-info">

                  <h3>
                    {product.name}
                  </h3>

                  <p className="producto-descripcion">
                    {product.description || 'Corte seleccionado'}
                  </p>


                  {/* PRECIO */}
                  <div className="producto-precio">

                    {product.previousPrice && (
                      <del>
                        {formatPrice(product.previousPrice)}
                      </del>
                    )}

                    <strong>
                      {formatPrice(product.price)}
                    </strong>

                    <span>
                      /kg
                    </span>

                  </div>

                  <button
                    type="button"
                    className="producto-whatsapp"
                    aria-label={`Consultar por ${product.name}`}
                    onClick={() => handleWhatsappConsult(product.name)}
                  >
                    <MessageIcon />
                    Consultar
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* =========================
            SECCIÓN DE CALIDAD
        ========================== */}
        <section className="trust">

          <p className="eyebrow">
            DESDE XXXX
          </p>

          <h2>
            Frescura y calidad de origen
          </h2>

          <p>
            Trabajamos con productores seleccionados y cuidamos
            cada detalle de la cadena de frío.
          </p>

        </section>

      </main>
    </>
  )
}

export default Home