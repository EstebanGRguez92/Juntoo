import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Juntoo</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/about">Acerca de</Link>
        </li>
        <li>
          <Link to="/contact">Contacto</Link>
        </li>
        <li>
          <Link to="/login" className="navbar-login">Ingresar</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
