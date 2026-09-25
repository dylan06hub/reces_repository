// Botón reutilizable para acciones de la interfaz.
import type { ButtonHTMLAttributes } from 'react'

export default function Button({
  children,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={['button', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </button>
  )
}
