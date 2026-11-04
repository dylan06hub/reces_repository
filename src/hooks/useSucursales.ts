import { useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import type { Paginated } from './useProducts'

export type Sucursal = {
  id: number
  nombre: string
  direccion: string
  ciudad: string
  telefono: string
  horario: string
}

export const loadSucursales = async (signal?: AbortSignal): Promise<Sucursal[]> => {
  // Mantener la información pública limitada a sucursales activas también para staff.
  let next: string | null = '/sucursales/?activa=true'
  const sucursales: Sucursal[] = []
  while (next) {
    signal?.throwIfAborted()
    const page: Paginated<Sucursal> = await apiFetch<Paginated<Sucursal>>(next, { signal, auth: false })
    sucursales.push(...page.results)
    next = page.next
  }
  return sucursales
}

export const useSucursales = () => {
  const [state, setState] = useState({ sucursales: [] as Sucursal[], loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()
    loadSucursales(controller.signal)
      .then(sucursales => {
        if (!controller.signal.aborted) setState({ sucursales, loading: false, error: '' })
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setState({ sucursales: [], loading: false, error: 'No pudimos cargar las sucursales y horarios. Intentá nuevamente más tarde.' })
        }
      })
    return () => controller.abort()
  }, [])

  return state
}
