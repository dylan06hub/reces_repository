// Hook de acceso al catálogo de productos.
import { useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import { products } from '../data/products'
import type { Product } from '../data/products'

const STORAGE_KEY = 'reces-catalog'

type ApiProducto = {
	id: number
	nombre: string
	descripcion: string
	precio: string
	previousPrice: string | null
	offer: boolean
	stock: number
	categoria: string
	imagen: string
	activo: boolean
	creado_en: string
}

type Paginated<T> = {
	count: number
	next: string | null
	previous: string | null
	results: T[]
}

export const mapProducto = (producto: ApiProducto): Product => ({
	name: producto.nombre,
	price: Number(producto.precio),
	previousPrice: producto.previousPrice ? Number(producto.previousPrice) : undefined,
	offer: producto.offer,
	image: producto.imagen || '/img/carne1.jpeg',
	description: producto.descripcion || 'Corte seleccionado',
})

export const loadProducts = (): Product[] => {
	try {
		const savedProducts = window.localStorage.getItem(STORAGE_KEY)
		if (!savedProducts) return products

		const parsedProducts: unknown = JSON.parse(savedProducts)
		return Array.isArray(parsedProducts) ? parsedProducts as Product[] : products
	} catch {
		return products
	}
}

export const saveProducts = (catalog: Product[]) => {
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog))
}

export const useProducts = () => {
	const [catalog, setCatalog] = useState<Product[]>([])

	useEffect(() => {
		let cancelled = false

		apiFetch<Paginated<ApiProducto>>('/productos/')
			.then((response) => {
				if (!cancelled) setCatalog(response.results.map(mapProducto))
			})
			.catch(() => {
				if (!cancelled) setCatalog(loadProducts())
			})

		return () => {
			cancelled = true
		}
	}, [])

	return catalog
}
