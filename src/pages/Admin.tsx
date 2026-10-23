import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { apiFetch, clearTokens, getAccessToken, login } from '../api/client'
import type { Product } from '../data/products'
import { mapProducto } from '../hooks/useProducts'
import type { ApiProducto, Paginated } from '../hooks/useProducts'

const defaultForm = {
  name: '',
  price: '',
  previousPrice: '',
  image: '/img/carne1.jpeg',
  offer: true,
  description: 'Corte premium disponible para entrega inmediata.'
}

export default function Admin() {
  const [catalog, setCatalog] = useState<Product[]>([])
  const [authenticated, setAuthenticated] = useState(() => Boolean(getAccessToken()))
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [form, setForm] = useState(defaultForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [saveError, setSaveError] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const loadCatalog = useCallback(async () => {
    setLoading(true)
    setSaveError('')

    try {
      let next: string | null = '/productos/'
      const items: Product[] = []

      while (next) {
        const page: Paginated<ApiProducto> = await apiFetch<Paginated<ApiProducto>>(next)
        items.push(...page.results.map(mapProducto))
        next = page.next
      }

      setCatalog(items)
    } catch {
      setSaveError('No se pudo cargar el catálogo desde la API.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authenticated) {
      // oxlint-disable-next-line react/set-state-in-effect -- carga inicial desde la API
      void loadCatalog()
    }
  }, [authenticated, loadCatalog])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target
    const checked = type === 'checkbox' ? (event.target as HTMLInputElement).checked : undefined

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoginError('')
    setSaving(true)

    try {
      await login(username.trim(), password)
      setAuthenticated(true)
      setPassword('')
    } catch {
      setLoginError('Usuario o contraseña incorrectos.')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    clearTokens()
    setAuthenticated(false)
    setCatalog([])
    setEditingId(null)
    setForm(defaultForm)
    setSaveError('')
    setDeleteError('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaveError('')

    if (form.image.trim().startsWith('data:')) {
      setSaveError('Usá una URL de imagen; la subida de archivos todavía no está disponible.')
      return
    }

    const payload = {
      nombre: form.name.trim() || 'Nuevo producto',
      precio: Number(form.price) || 0,
      previousPrice: form.previousPrice ? Number(form.previousPrice) : null,
      offer: form.offer,
      imagen: form.image.trim(),
      descripcion: form.description.trim() || 'Corte seleccionado',
    }

    setSaving(true)

    try {
      await apiFetch(editingId === null ? '/productos/' : `/productos/${editingId}/`, {
        method: editingId === null ? 'POST' : 'PATCH',
        body: JSON.stringify(payload),
      })

      await loadCatalog()
      setForm(defaultForm)
      setEditingId(null)
    } catch {
      setSaveError('No se pudo guardar el producto. Revisá la sesión y los datos.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (product: Product) => {
    if (product.id === undefined) return

    setEditingId(product.id)
    setSaveError('')
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
    setEditingId(null)
    setForm(defaultForm)
    setSaveError('')
  }

  const handleDelete = async (product: Product) => {
    if (product.id === undefined) return
    if (!window.confirm(`¿Eliminar "${product.name}" del catálogo?`)) return

    setDeleteError('')

    try {
      await apiFetch(`/productos/${product.id}/`, { method: 'DELETE' })
      await loadCatalog()

      if (editingId === product.id) {
        handleCancelEdit()
      }
    } catch {
      setDeleteError('No se pudo eliminar el producto.')
    }
  }

  if (!authenticated) {
    return (
      <main className="admin-page">
        <section className="admin-hero">
          <div className="admin-hero__content">
            <p className="eyebrow">Panel administrativo</p>
            <h1>Iniciar sesión</h1>
            <p>Ingresá con un usuario administrador para gestionar el catálogo.</p>
          </div>
        </section>

        <section className="admin-layout section">
          <form className="admin-form" onSubmit={handleLogin}>
            <label>
              <span>Usuario</span>
              <input
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
              />
            </label>

            <label>
              <span>Contraseña</span>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </label>

            <div className="admin-form__actions">
              <button type="submit" className="button" disabled={saving}>
                {saving ? 'Ingresando...' : 'Ingresar'}
              </button>
            </div>

            {loginError && <small className="admin-image-error" role="alert">{loginError}</small>}
          </form>
        </section>
      </main>
    )
  }

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div className="admin-hero__content">
          <p className="eyebrow">Panel administrativo</p>
          <h1>{editingId === null ? 'Cargar nuevo producto' : 'Editar producto'}</h1>
          <p>
            Agregá cortes nuevos al catálogo para mantener tu sección de productos actualizada con la misma identidad visual de la marca.
          </p>
          <button type="button" className="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
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

          <div className="admin-form__actions">
            <button type="submit" className="button" disabled={saving}>
              {saving ? 'Guardando...' : editingId === null ? 'Agregar producto' : 'Guardar cambios'}
            </button>
            {editingId !== null && (
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
          {loading && <small role="status">Cargando catálogo...</small>}
          {deleteError && <small className="admin-image-error" role="alert">{deleteError}</small>}
        </div>

        <div className="productos-grid admin-grid">
          {catalog.map((product, index) => (
            <article className="producto-card" key={product.id ?? `${product.name}-${index}`}>
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
                  <button type="button" className="admin-edit-button" onClick={() => handleEdit(product)}>
                    Editar
                  </button>
                  <button type="button" className="admin-delete-button" onClick={() => handleDelete(product)}>
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
