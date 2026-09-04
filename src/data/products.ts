export type Product = {
  name: string
  price: number
  previousPrice?: number
  image: string
  offer?: boolean
}

export const products: Product[] = [
  { name: 'Bife de chorizo', price: 12900, previousPrice: 14500, image: '/images/productos/bife-de-chorizo.jpg', offer: true },
  { name: 'Asado de tira', price: 9800, image: '/images/productos/asado-de-tira.jpg' },
  { name: 'Vacío premium', price: 11200, previousPrice: 12500, image: '/images/productos/vacio-premium.jpg', offer: true },
  { name: 'Entraña selecta', price: 13800, image: '/images/productos/entrana-selecta.jpg' },
  { name: 'Nalga para milanesas', price: 10500, image: '/images/productos/nalga-milanesas.jpg' },
  { name: 'Matambre tiernizado', price: 9200, image: '/images/productos/matambre-tiernizado.jpg' },
  { name: 'Costilla de novillo', price: 8900, image: '/images/productos/costilla-novillo.jpg' },
  { name: 'Lomo exclusivo', price: 15600, image: '/images/productos/lomo-exclusivo.jpg' },
  { name: 'Paleta de ternera', price: 8700, image: '/images/productos/paleta-ternera.jpg' },
]
