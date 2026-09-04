import { Link } from 'react-router-dom';
import './App.css';

const Header = () => {
  return (
    <header className="header">

      <div className="header-left">
        <img
          className="logo"
          src="/logoo.png"
          alt="Logo RESES"
        />

        <h1 className="title">RESES S.R.L.</h1>
      </div>

      <div className="header-right">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Inicio</Link>
            </li>

            <li>
              <Link to="/nosotros">Nosotros</Link>
            </li>

            <li>
              <Link to="/contact">Contacto</Link>
            </li>
          </ul>
        </nav>
      </div>

    </header>
  );
};

export default Header;