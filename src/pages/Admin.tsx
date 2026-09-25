import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { products as initialProducts, type Product } from '../data/products'

const defaultForm = {
  name: '',
  price: '',
  previousPrice: '',
  image: '/img/carne1.jpeg',
  offer: true,
  description: 'Corte premium disponible para entrega inmediata.'
}

export default function Admin() {
  const [catalog, setCatalog] = useState<Product[]>(initialProducts)
  const [form, setForm] = useState(defaultForm)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target
    const checked = type === 'checkbox' ? (event.target as HTMLInputElement).checked : undefined

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextProduct: Product = {
      name: form.name.trim() || 'Nuevo producto',
      price: Number(form.price) || 0,
      previousPrice: form.previousPrice ? Number(form.previousPrice) : undefined,
      image: form.image.trim() || '/img/carne1.jpeg',
      offer: form.offer,
    }

    setCatalog((current) => [nextProduct, ...current])
    setForm(defaultForm)
  }

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div className="admin-hero__content">
          <p className="eyebrow">Panel administrativo</p>
          <h1>Cargar nuevo producto</h1>
          <p>
            Agregá cortes nuevos al catálogo para mantener tu sección de productos actualizada con la misma identidad visual de la marca.
          </p>
        </div>
      </section>

      <section className="admin-layout section">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              <span>Nombre</span>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Ej: Costeleta premium" required />
            </label>
            <label>
              <span>Precio</span>
              <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="15000" required />
            </label>
          </div>

          <div className="form-row">
            <label>
              <span>Precio anterior</span>
              <input name="previousPrice" type="number" value={form.previousPrice} onChange={handleChange} placeholder="18000" />
            </label>
            <label>
              <span>URL de imagen</span>
              <input name="image" value={form.image} onChange={handleChange} placeholder="/img/carne1.jpeg" />
            </label>
          </div>

          <label>
            <span>Descripción</span>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Descripción del corte" />
          </label>

          <label className="admin-check">
            <input type="checkbox" name="offer" checked={form.offer} onChange={handleChange} />
            <span>Mostrar badge de oferta</span>
          </label>

          <button type="submit" className="button">Guardar Producto</button>
        </form>

        <div className="admin-preview">
          <div className="admin-preview__header">
            <p className="eyebrow">Vista previa</p>
            <h2>Tarjeta del producto</h2>
          </div>

          <article className="producto-card admin-product-card">
            <div className="producto-imagen">
              <img src={form.image || '/img/carne1.jpeg'} alt={form.name || 'Producto'} />
              {form.offer && <span className="badge">OFERTA</span>}
            </div>

            <div className="producto-info">
              <h3>{form.name || 'Nuevo producto'}</h3>
              <p className="producto-descripcion">{form.description || 'Corte premium disponible para entrega inmediata.'}</p>

              <div className="producto-precio">
                {form.previousPrice && <del>${Number(form.previousPrice).toLocaleString('es-AR')}</del>}
                <strong>${Number(form.price || 0).toLocaleString('es-AR')}</strong>
                <span>/kg</span>
              </div>

              <button type="button" className="producto-whatsapp">
                Consultar
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="admin-list section">
        <div className="admin-list__header">
          <p className="eyebrow">Catálogo actual</p>
          <h2>Productos cargados</h2>
        </div>

        <div className="productos-grid admin-grid">
          {catalog.map((product) => (
            <article className="producto-card" key={`${product.name}-${product.price}`}>
              <div className="producto-imagen">
                <img src={product.image} alt={product.name} />
                {product.offer && <span className="badge">OFERTA</span>}
              </div>

              <div className="producto-info">
                <h3>{product.name}</h3>
                <p className="producto-descripcion">Corte seleccionado</p>

                <div className="producto-precio">
                  {product.previousPrice && <del>${product.previousPrice.toLocaleString('es-AR')}</del>}
                  <strong>${product.price.toLocaleString('es-AR')}</strong>
                  <span>/kg</span>
                </div>

                <button type="button" className="producto-whatsapp">
                  Consultar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
