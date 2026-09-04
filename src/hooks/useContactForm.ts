import { useState } from 'react'
import { isValidEmail } from '../utils/validators'

export const useContactForm = () => {
  const [sent, setSent] = useState(false)
  const submit = (formData: FormData) => {
    const email = String(formData.get('email') ?? '')
    if (!isValidEmail(email)) return false
    setSent(true)
    return true
  }
  return { sent, submit }
}
