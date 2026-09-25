// Página inicial con carrusel, catálogo y garantía de calidad.

import { useProducts } from '../hooks/useProducts'
import { formatPrice } from '../utils/formatPrice'
import Badge from '../components/Badge'
import Carrusel from '../components/Carrusel'

const Home = () => {
  const products = useProducts()

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