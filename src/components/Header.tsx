import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

type HeaderProps = {
  onNavigate?: (nextPath: string) => void;
};

const Header = ({ onNavigate }: HeaderProps) => {
  const handleNavigate = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.(path);
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <header className="header">
      <div className="header-left">
        <img className="logo" src="/logo.png" alt="Logo RESES" />
        <h1 className="title">RESES S.R.L.</h1>
      </div>

      <div className="header-center">
        <SearchBar />
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={handleNavigate('/')}>
              Inicio
            </Link>
          </li>

          <li>
            <Link to="/nosotros" onClick={handleNavigate('/nosotros')}>
              Nosotros
            </Link>
          </li>

          <li>
            <Link to="/contacto" onClick={handleNavigate('/contacto')}>
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;