// Hook que valida y envía el formulario de contacto a la API.
import { useState } from 'react'
import { apiFetch, getErrorMessage } from '../api/client'
import { isValidEmail } from '../utils/validators'

export const useContactForm = () => {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const submit = async (formData: FormData) => {
    const nombre = String(formData.get('nombre') ?? '').trim()
    const apellido = String(formData.get('apellido') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const mensaje = String(formData.get('comentario') ?? formData.get('mensaje') ?? '').trim()

    setError('')
    setSent(false)

    if (!isValidEmail(email)) {
      setError('Ingresa un email valido para poder responderte.')
      return false
    }

    setSending(true)

    try {
      await apiFetch('/contacto/', {
        method: 'POST',
        body: JSON.stringify({
          nombre: [nombre, apellido].filter(Boolean).join(' '),
          email,
          telefono: '',
          mensaje,
        }),
      })

      setSent(true)
      return true
    } catch (error) {
      setError(getErrorMessage(error, 'No se pudo enviar el mensaje. Intentá de nuevo.'))
      return false
    } finally {
      setSending(false)
    }
  }

  return { sent, sending, error, submit }
}
