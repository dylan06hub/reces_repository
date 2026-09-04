import type { Product } from '../../../data/products'
import Badge from '../../../components/ui/Badge'
import { formatPrice } from '../../../utils/formatPrice'

export default function ProductCard({ product }: { product: Product }) { return <article className="product-card"><div className="product-image"><img src={product.image} alt={product.name} onError={(event) => { event.currentTarget.style.display = 'none' }} />{product.offer && <Badge>¡OFERTA!</Badge>}</div><div><h3>{product.name}</h3><strong>{formatPrice(product.price)}</strong>{product.previousPrice && <del>{formatPrice(product.previousPrice)}</del>}</div></article> }
