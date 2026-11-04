const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

const ACCESS_KEY = 'reces-access'
const REFRESH_KEY = 'reces-refresh'
export const SESSION_ENDED_EVENT = 'reces-session-ended'

type Tokens = {
  access: string
  refresh: string
}

export class ApiError extends Error {
  status: number
  details: unknown

  constructor(status: number, details: unknown) {
    super(`API ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

const fieldLabels: Record<string, string> = {
  nombre: 'Nombre', email: 'Email', telefono: 'Teléfono', mensaje: 'Mensaje',
  precio: 'Precio', previousPrice: 'Precio anterior', offer: 'Oferta',
  descripcion: 'Descripción', imagen_upload: 'Imagen', username: 'Usuario', password: 'Contraseña',
}

const collectMessages = (value: unknown, field = ''): string[] => {
  if (typeof value === 'string') return [field ? `${field}: ${value}` : value]
  if (Array.isArray(value)) return value.flatMap(item => collectMessages(item, field))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => {
      if (key === 'code') return []
      const label = key === 'detail' || key === 'non_field_errors' ? field : fieldLabels[key] || key
      return collectMessages(item, label)
    })
  }
  return []
}

export const getErrorMessage = (error: unknown, fallback: string): string => {
  // Los errores de validación son útiles; una respuesta interna 500 no se muestra al usuario.
  if (!(error instanceof ApiError) || error.status >= 500) return fallback
  const messages = collectMessages(error.details)
  return messages.length ? messages.join(' ') : fallback
}

const responseError = async (response: Response) => {
  const details: unknown = await response.json().catch(() => null)
  return new ApiError(response.status, details)
}

export const getAccessToken = () => window.localStorage.getItem(ACCESS_KEY)

export const clearTokens = () => {
  window.localStorage.removeItem(ACCESS_KEY)
  window.localStorage.removeItem(REFRESH_KEY)
  window.dispatchEvent(new Event(SESSION_ENDED_EVENT))
}

const saveTokens = (tokens: Tokens) => {
  window.localStorage.setItem(ACCESS_KEY, tokens.access)
  window.localStorage.setItem(REFRESH_KEY, tokens.refresh)
}

const request = (path: string, options: RequestInit, token: string | null) => {
  const url = path.startsWith('http') ? path : `${API_URL}${path}`
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData

  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  }

  if (!isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  if (isFormData) {
    delete headers['Content-Type']
  }

  return fetch(url, {
    ...options,
    headers,
  })
}


let refreshInFlight: Promise<string | null> | null = null

const performRefresh = async () => {
  const refresh = window.localStorage.getItem(REFRESH_KEY)
  if (!refresh) {
    clearTokens()
    return null
  }

  const response = await fetch(`${API_URL}/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })

  // No restaurar una sesión cerrada ni sobrescribir un login más reciente.
  if (window.localStorage.getItem(REFRESH_KEY) !== refresh) return null

  if (!response.ok) {
    if (response.status === 400 || response.status === 401) clearTokens()
    throw await responseError(response)
  }

  const data = await response.json() as Tokens
  if (window.localStorage.getItem(REFRESH_KEY) !== refresh) return null
  // Django rota e invalida el refresh anterior: se deben guardar ambos tokens.
  saveTokens(data)
  return data.access
}

const refreshAccessToken = () => {
  // Las solicitudes que vencen juntas comparten una única renovación.
  if (!refreshInFlight) {
    refreshInFlight = performRefresh().finally(() => { refreshInFlight = null })
  }
  return refreshInFlight
}

export const apiFetch = async <T>(
  path: string,
  { auth = true, ...options }: RequestInit & { auth?: boolean } = {},
): Promise<T> => {
  // Las consultas públicas no dependen de la sesión guardada del administrador.
  const token = auth ? getAccessToken() : null
  let response = await request(path, options, token)

  if (response.status === 401 && token) {
    const currentToken = getAccessToken()
    const renewedToken = currentToken && currentToken !== token
      ? currentToken
      : currentToken ? await refreshAccessToken() : null
    if (renewedToken) {
      response = await request(path, options, renewedToken)
      if (response.status === 401 && getAccessToken() === renewedToken) clearTokens()
    }
  }

  if (!response.ok) {
    throw await responseError(response)
  }

  return response.status === 204 ? (undefined as T) : response.json()
}

export const login = async (username: string, password: string) => {
  const response = await request('/auth/token/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  }, null)
  if (!response.ok) throw await responseError(response)
  const tokens = await response.json() as Tokens

  saveTokens(tokens)
  return tokens
}
