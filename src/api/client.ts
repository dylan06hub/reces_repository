const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

const ACCESS_KEY = 'reces-access'
const REFRESH_KEY = 'reces-refresh'
export const SESSION_ENDED_EVENT = 'reces-session-ended'

type Tokens = {
  access: string
  refresh: string
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
    throw new Error(`API ${response.status}`)
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

export const apiFetch = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const token = getAccessToken()
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
    throw new Error(`API ${response.status}`)
  }

  return response.status === 204 ? (undefined as T) : response.json()
}

export const login = async (username: string, password: string) => {
  const response = await request('/auth/token/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  }, null)
  if (!response.ok) throw new Error(`API ${response.status}`)
  const tokens = await response.json() as Tokens

  saveTokens(tokens)
  return tokens
}
