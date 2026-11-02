// La URL comparte la búsqueda entre el encabezado y el catálogo.
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const SearchBar = () => {
  const [params] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const search = params.get('buscar') ?? ''

  const handleSearch = (value: string) => {
    const next = new URLSearchParams(pathname === '/' ? params : undefined)
    if (value) next.set('buscar', value)
    else next.delete('buscar')
    // Cada letra reemplaza la búsqueda actual para no llenar el historial.
    navigate({ pathname: '/', search: next.toString() }, { replace: pathname === '/' })
  }

  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        type="search"
        aria-label="Buscar cortes por nombre"
        placeholder="Buscar tu corte preferido (Asado, Bife, Vacío)..."
        value={search}
        onChange={event => handleSearch(event.target.value)}
      />
    </div>
  )
}

export default SearchBar
