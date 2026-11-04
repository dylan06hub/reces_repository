// Hook de acceso al catálogo de productos.
import { useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import type { Product } from '../data/products'

export type ApiProducto = {
	id: number
	nombre: string
	descripcion: string
	precio: string
	previousPrice: string | null
	offer: boolean
	stock: number
	categoria: string
	imagen: string | null
	activo: boolean
	creado_en: string
}

export type Paginated<T> = {
	count: number
	next: string | null
	previous: string | null
	results: T[]
}

export const mapProducto = (producto: ApiProducto): Product => ({
	id: producto.id,
	name: producto.nombre,
	price: Number(producto.precio),
	previousPrice: producto.previousPrice ? Number(producto.previousPrice) : undefined,
	offer: producto.offer,
	image: producto.imagen || '/img/carne1.jpeg',
	description: producto.descripcion || 'Corte seleccionado',
})

export const loadProducts = async (signal?: AbortSignal): Promise<Product[]> => {
	// La página pública muestra activos incluso si hay una sesión staff abierta.
	let next: string | null = '/productos/?activo=true'
	const catalog: Product[] = []

	while (next) {
		signal?.throwIfAborted()
		const page: Paginated<ApiProducto> = await apiFetch<Paginated<ApiProducto>>(next, { signal, auth: false })
		catalog.push(...page.results.map(mapProducto))
		next = page.next
	}

	return catalog
}

export const useProducts = () => {
	const [state, setState] = useState({
		catalog: [] as Product[],
		loading: true,
		error: '',
	})
	const [attempt, setAttempt] = useState(0)

	const reload = () => {
		setState({ catalog: [], loading: true, error: '' })
		setAttempt(current => current + 1)
	}

	useEffect(() => {
		const controller = new AbortController()

		loadProducts(controller.signal)
			.then(catalog => {
				if (!controller.signal.aborted) setState({ catalog, loading: false, error: '' })
			})
			.catch(() => {
				// No mostrar un catálogo parcial o de ejemplo si falla cualquier página.
				if (!controller.signal.aborted) {
					setState({ catalog: [], loading: false, error: 'No pudimos cargar los productos. Intentá nuevamente.' })
				}
			})

		return () => controller.abort()
	}, [attempt])

	return { ...state, reload }
}
