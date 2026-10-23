const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

const ACCESS_KEY = 'reces-access'
const REFRESH_KEY = 'reces-refresh'

type Tokens = {
  access: string
  refresh: string
}

export const getAccessToken = () => window.localStorage.getItem(ACCESS_KEY)

export const clearTokens = () => {
  window.localStorage.removeItem(ACCESS_KEY)
  window.localStorage.removeItem(REFRESH_KEY)
}

const saveTokens = (tokens: Tokens) => {
  window.localStorage.setItem(ACCESS_KEY, tokens.access)
  window.localStorage.setItem(REFRESH_KEY, tokens.refresh)
}

const request = (path: string, options: RequestInit, token: string | null) => {
  const url = path.startsWith('http') ? path : `${API_URL}${path}`

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
}

const refreshAccessToken = async () => {
  const refresh = window.localStorage.getItem(REFRESH_KEY)
  if (!refresh) return null

  const response = await fetch(`${API_URL}/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })

  if (!response.ok) {
    clearTokens()
    return null
  }

  const data = await response.json() as Pick<Tokens, 'access'>
  window.localStorage.setItem(ACCESS_KEY, data.access)
  return data.access
}

export const apiFetch = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const token = getAccessToken()
  let response = await request(path, options, token)

  if (response.status === 401 && token) {
    const renewedToken = await refreshAccessToken()
    if (renewedToken) response = await request(path, options, renewedToken)
  }

  if (!response.ok) {
    throw new Error(`API ${response.status}`)
  }

  return response.status === 204 ? (undefined as T) : response.json()
}

export const login = async (username: string, password: string) => {
  const tokens = await apiFetch<Tokens>('/auth/token/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })

  saveTokens(tokens)
  return tokens
}
