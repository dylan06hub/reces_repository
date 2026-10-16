import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { Product } from '../data/products'
import { loadProducts, saveProducts } from '../hooks/useProducts'

const MAX_IMAGE_SIZE = 2 * 1024 * 1024

const defaultForm = {
  name: '',
  price: '',
  previousPrice: '',
  image: '/img/carne1.jpeg',
  offer: true,
  description: 'Corte premium disponible para entrega inmediata.'
}

export default function Admin() {
  const [catalog, setCatalog] = useState<Product[]>(loadProducts)
  const [form, setForm] = useState(defaultForm)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [imageError, setImageError] = useState('')
  const [saveError, setSaveError] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [selectedImageName, setSelectedImageName] = useState('')
  const [imageLoading, setImageLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target
    const checked = type === 'checkbox' ? (event.target as HTMLInputElement).checked : undefined

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (name === 'image') {
      setSelectedImageName('')
      if (imageInputRef.current) imageInputRef.current.value = ''
    }
  }

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setImageError('Seleccioná un archivo de imagen válido.')
      event.target.value = ''
      return
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError('La imagen debe pesar menos de 2 MB.')
      event.target.value = ''
      return
    }

    setImageError('')
    setSelectedImageName(file.name)
    setImageLoading(true)

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setForm((current) => ({ ...current, image: reader.result as string }))
      }
      setImageLoading(false)
    }
    reader.onerror = () => {
      setImageError('No se pudo cargar la imagen. Intentá con otro archivo.')
      setSelectedImageName('')
      setImageLoading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextProduct: Product = {
      name: form.name.trim() || 'Nuevo producto',
      price: Number(form.price) || 0,
      previousPrice: form.previousPrice ? Number(form.previousPrice) : undefined,
      image: form.image.trim() || '/img/carne1.jpeg',
      offer: form.offer,
      description: form.description.trim() || 'Corte seleccionado',
    }

    const nextCatalog = editingIndex === null
      ? [nextProduct, ...catalog]
      : catalog.map((product, index) => index === editingIndex ? nextProduct : product)

    try {
      saveProducts(nextCatalog)
    } catch {
      setSaveError('No se pudo guardar el catálogo en este navegador. Probá con una imagen más liviana.')
      return
    }

    setCatalog(nextCatalog)
    setForm(defaultForm)
    setEditingIndex(null)
    setImageError('')
    setSaveError('')
    setSelectedImageName('')
    if (imageInputRef.current) imageInputRef.current.value = ''
  }

  const handleEdit = (index: number, product: Product) => {
    setEditingIndex(index)
    setImageError('')
    setSaveError('')
    setSelectedImageName('')
    if (imageInputRef.current) imageInputRef.current.value = ''
    setForm({
      name: product.name,
      price: String(product.price),
      previousPrice: product.previousPrice ? String(product.previousPrice) : '',
      image: product.image,
      offer: Boolean(product.offer),
      description: product.description || 'Corte seleccionado',
    })
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setForm(defaultForm)
    setImageError('')
    setSaveError('')
    setSelectedImageName('')
    if (imageInputRef.current) imageInputRef.current.value = ''
  }

  const handleDelete = (index: number, productName: string) => {
    if (!window.confirm(`¿Eliminar "${productName}" del catálogo?`)) return

    const nextCatalog = catalog.filter((_, productIndex) => productIndex !== index)

    try {
      saveProducts(nextCatalog)
    } catch {
      setDeleteError('No se pudo guardar el cambio en este navegador.')
      return
    }

    setCatalog(nextCatalog)
    setDeleteError('')

    if (editingIndex === index) {
      handleCancelEdit()
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1)
    }
  }

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div className="admin-hero__content">
          <p className="eyebrow">Panel administrativo</p>
          <h1>{editingIndex === null ? 'Cargar nuevo producto' : 'Editar producto'}</h1>
          <p>
            Agregá cortes nuevos al catálogo para mantener tu sección de productos actualizada con la misma identidad visual de la marca.
          </p>
        </div>
      </section>

      <section className="admin-layout section">
        <form ref={formRef} className="admin-form" onSubmit={handleSubmit}>
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
            <div className="admin-image-field">
              <label htmlFor="product-image-url">URL de imagen</label>
              <div className="admin-image-field__controls">
                <input id="product-image-url" name="image" value={form.image} onChange={handleChange} placeholder="/img/carne1.jpeg" />
                <input
                  ref={imageInputRef}
                  className="admin-image-file-input"
                  type="file"
                  accept="image/*"
                  aria-label="Seleccionar archivo de imagen"
                  onChange={handleImageSelect}
                />
                <button type="button" className="admin-choose-image" onClick={() => imageInputRef.current?.click()}>
                  Elegir imagen
                </button>
              </div>
              {selectedImageName && <small>{selectedImageName}</small>}
              {imageLoading && <small role="status">Cargando imagen...</small>}
              {imageError && <small className="admin-image-error" role="alert">{imageError}</small>}
            </div>
          </div>

          <label>
            <span>Descripción</span>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Descripción del corte" />
          </label>

          <label className="admin-check">
            <input type="checkbox" name="offer" checked={form.offer} onChange={handleChange} />
            <span>Mostrar badge de oferta</span>
          </label>

          <div className="admin-form__actions">
            <button type="submit" className="button" disabled={imageLoading}>
              {imageLoading ? 'Cargando imagen...' : editingIndex === null ? 'Agregar producto' : 'Guardar cambios'}
            </button>
            {editingIndex !== null && (
              <button type="button" className="admin-cancel-button" onClick={handleCancelEdit}>
                Cancelar
              </button>
            )}
          </div>
          {saveError && <small className="admin-image-error" role="alert">{saveError}</small>}
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
          {deleteError && <small className="admin-image-error" role="alert">{deleteError}</small>}
        </div>

        <div className="productos-grid admin-grid">
          {catalog.map((product, index) => (
            <article className="producto-card" key={`${product.name}-${index}`}>
              <div className="producto-imagen">
                <img src={product.image} alt={product.name} />
                {product.offer && <span className="badge">OFERTA</span>}
              </div>

              <div className="producto-info">
                <h3>{product.name}</h3>
                <p className="producto-descripcion">{product.description || 'Corte seleccionado'}</p>

                <div className="producto-precio">
                  {product.previousPrice && <del>${product.previousPrice.toLocaleString('es-AR')}</del>}
                  <strong>${product.price.toLocaleString('es-AR')}</strong>
                  <span>/kg</span>
                </div>

                <button type="button" className="producto-whatsapp">
                  Consultar
                </button>

                <div className="admin-card-actions">
                  <button type="button" className="admin-edit-button" onClick={() => handleEdit(index, product)}>
                    Editar
                  </button>
                  <button type="button" className="admin-delete-button" onClick={() => handleDelete(index, product.name)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
