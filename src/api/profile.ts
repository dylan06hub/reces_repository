import { ApiError, apiFetch } from './client'

export type CurrentUser = {
  id: number
  username: string
  can_manage_catalog: boolean
}

export const getAdminProfile = async (signal?: AbortSignal) => {
  const profile = await apiFetch<CurrentUser>('/usuarios/me/', { signal })
  // El panel espera la confirmación del servidor, incluso con un token guardado.
  if (profile.can_manage_catalog !== true) {
    throw new ApiError(403, { detail: 'Tu cuenta no tiene permisos para administrar el catálogo.' })
  }
  return profile
}
