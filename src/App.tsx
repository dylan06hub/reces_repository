// Contenedor principal con navegación y layout compartidos.
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { routes } from './router'

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return <><Header /><main><Routes>
    {Object.entries(routes).map(([path, Page]) => <Route key={path} path={path} element={<Page />} />)}
  </Routes></main><Footer /></>
}

export default App
