// Buscador reutilizable para filtrar contenido del catálogo.


import { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="search-bar">
      <span className="search-icon">⌕</span>

      <input
        type="text"
        placeholder="Buscar tu corte preferido (Asado, Bife, Vacío)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;