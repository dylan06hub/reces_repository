import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = () => {
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
            <Link to="/">
              Inicio
            </Link>
          </li>

          <li>
            <Link to="/nosotros">
              Nosotros
            </Link>
          </li>

          <li>
            <Link to="/contacto">
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;