import { useProducts } from '../../hooks/useProducts'
import { formatPrice } from '../../utils/formatPrice'
import Badge from '../../components/ui/Badge'

export default function Home() {
  const products = useProducts()
  return <>
    <section className="hero"><div><p className="eyebrow">Carnicería de selección</p><h1>El corte justo<br /><em>para cada ocasión.</em></h1><p>Calidad de origen, maduración precisa y el sabor que se reconoce desde el primer bocado.</p><a className="button" href="#productos">Ver cortes</a></div></section>
    <section className="section" id="productos"><div className="section-heading"><div><p className="eyebrow">Nuestra selección</p><h2>Los mejores cortes</h2></div><p>Elegidos por expertos, listos para llevar a tu mesa.</p></div><div className="product-grid">{products.map((product) => <article className="product-card" key={product.name}><div className="product-image"><img src={product.image} alt={product.name} />{product.offer && <Badge>¡OFERTA!</Badge>}</div><div><h3>{product.name}</h3><strong>{formatPrice(product.price)}</strong>{product.previousPrice && <del>{formatPrice(product.previousPrice)}</del>}</div></article>)}</div></section>
    <section className="trust"><p className="eyebrow">Desde 1984</p><h2>Frescura y calidad de origen</h2><p>Trabajamos con productores seleccionados y cuidamos cada detalle de la cadena de frío.</p></section>
  </>
}
