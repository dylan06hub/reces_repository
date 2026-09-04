type HeaderProps = { onNavigate: (path: string) => void }

export default function Header({ onNavigate }: HeaderProps) {
  return <header className="site-header">
    <button className="brand" onClick={() => onNavigate('/')} aria-label="Ir al inicio">RECES<span>S.R.L.</span></button>
    <nav aria-label="Navegación principal">
      <button onClick={() => onNavigate('/')}>Inicio</button>
      <button onClick={() => onNavigate('/nosotros')}>Nosotros</button>
      <button onClick={() => onNavigate('/contacto')}>Contacto</button>
    </nav>
    <a className="header-phone" href="tel:+5491100000000">+54 9 11 0000 0000</a>
  </header>
}
