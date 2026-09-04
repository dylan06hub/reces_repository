import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = { children: ReactNode; onNavigate: (path: string) => void }

export default function Layout({ children, onNavigate }: LayoutProps) {
  return <><Header onNavigate={onNavigate} /><main>{children}</main><Footer /></>
}
