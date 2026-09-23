// Contenedor reutilizable para contenido agrupado.
import type { HTMLAttributes, ReactNode } from 'react'

export default function Card({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return (
    <article className={['card', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </article>
  )
}
