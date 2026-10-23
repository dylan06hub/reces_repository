const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

export const apiFetch = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API ${response.status}`)
  }

  return response.status === 204 ? (undefined as T) : response.json()
}
