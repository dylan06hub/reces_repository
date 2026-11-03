import type { Product } from '../data/products'

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export const filterProducts = (products: Product[], search: string): Product[] => {
  const query = normalize(search.trim())
  return query ? products.filter(product => normalize(product.name).includes(query)) : products
}
