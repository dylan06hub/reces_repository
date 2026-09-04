import type { Product } from '../../../data/products'
import ProductCard from './ProductCard'

export default function ProductGrid({ products }: { products: Product[] }) { return <div className="product-grid">{products.map((product) => <ProductCard key={product.name} product={product} />)}</div> }
