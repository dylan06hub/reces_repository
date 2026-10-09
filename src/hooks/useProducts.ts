// Hook de acceso al catálogo de productos.
import { useEffect, useState } from 'react'
import { products } from '../data/products'
import type { Product } from '../data/products'

const STORAGE_KEY = 'reces-catalog'

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
	const [catalog, setCatalog] = useState(loadProducts)

	useEffect(() => {
		const syncCatalog = () => setCatalog(loadProducts())
		window.addEventListener('storage', syncCatalog)
		return () => window.removeEventListener('storage', syncCatalog)
	}, [])

	return catalog
}
