// Página inicial con carrusel, catálogo y garantía de calidad.

import { useProducts } from '../hooks/useProducts'
import { formatPrice } from '../utils/formatPrice'
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
  const products = useProducts()

  const handleWhatsappConsult = (productName: string) => {
    const newWindow = window.open('about:blank', '_blank')

    if (!newWindow) return

    newWindow.document.write(`
      <html>
        <head>
          <title>WhatsApp</title>
          <meta charset="UTF-8" />
          <style>
            body {
              margin: 0;
              min-height: 100vh;
              display: grid;
              place-items: center;
              background: #f4f4f4;
              font-family: Arial, sans-serif;
              color: #111;
            }
            .card {
              background: white;
              padding: 32px 40px;
              border-radius: 16px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.08);
              text-align: center;
            }
            p {
              margin: 0;
              font-size: 1.2rem;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <p>Acá el WhatsApp</p>
            <p style="margin-top: 12px; font-size: 0.9rem; color: #555;">Consulta por: ${productName}</p>
          </div>
        </body>
      </html>
    `)
    newWindow.document.close()
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


          {/* GRILLA DE PRODUCTOS */}
          <div className="productos-grid">

            {products.map((product) => (

              <article
                className="producto-card"
                key={product.name}
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
                    Corte seleccionado
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