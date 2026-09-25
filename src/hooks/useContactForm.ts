// Hook que valida y controla el estado de envío del formulario.
import { useState } from 'react'
import { isValidEmail } from '../utils/validators'

export const useContactForm = () => {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const submit = (formData: FormData) => {
    const email = String(formData.get('email') ?? '')
    setError('')
    setSent(false)
    if (!isValidEmail(email)) {
      setError('Ingresa un email valido para poder responderte.')
      return false
    }
    setSent(true)
    return true
  }
  return { sent, error, submit }
}
