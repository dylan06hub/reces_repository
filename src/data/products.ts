// Catálogo tipado de cortes, precios, ofertas e imágenes.
export type Product = {
  name: string
  price: number
  previousPrice?: number
  image: string
  offer?: boolean
}

export const products: Product[] = [
  { name: 'Bife de chorizo', price: 12900, previousPrice: 14500, image: '/img/carne4.jpeg', offer: true },
  { name: 'Asado de tira', price: 9800, image: '/img/carne5.jpeg' },
  { name: 'Vacío premium', price: 11200, previousPrice: 12500, image: '/img/carne6.jpeg', offer: true },
  { name: 'Entraña selecta', price: 13800, image: '/img/carne7.jpeg' },
  { name: 'Nalga para milanesas', price: 10500, image: '/img/carne8.jpeg' },
  { name: 'Matambre tiernizado', price: 9200, image: '/img/carne9.jpeg' },
  { name: 'Costilla de novillo', price: 8900, image: '/img/carne10.jpeg' },
  { name: 'Lomo exclusivo', price: 15600, image: '/img/carne11.jpeg' },
  { name: 'Paleta de ternera', price: 8700, image: '/img/carne12.jpeg' },
]
