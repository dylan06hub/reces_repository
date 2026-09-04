import { useEffect, useState } from 'react'
import Contacto from './pages/Contacto/Contacto'
import Home from './pages/Home/Home'
import Nosotros from './pages/Nosotros/Nosotros'
import Layout from './components/layout/Layout'

function App() {
	const [path, setPath] = useState(window.location.pathname)

	useEffect(() => {
		const handlePopState = () => setPath(window.location.pathname)
		window.addEventListener('popstate', handlePopState)
		return () => window.removeEventListener('popstate', handlePopState)
	}, [])

	const navigate = (nextPath: string) => {
		window.history.pushState({}, '', nextPath)
		setPath(nextPath)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const page = path === '/nosotros' ? <Nosotros /> : path === '/contacto' ? <Contacto /> : <Home />

	return <Layout onNavigate={navigate}>{page}</Layout>
}

export default App
