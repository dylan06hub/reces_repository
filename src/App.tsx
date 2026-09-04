// Contenedor principal: selecciona la página actual y monta el layout global.
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { routes } from './router'

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

	const Page = routes[path as keyof typeof routes] ?? routes['/']

	return <><Header onNavigate={navigate} /><main><Page /></main><Footer /></>
}

export default App
