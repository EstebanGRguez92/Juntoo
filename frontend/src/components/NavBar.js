import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Comprobar si hay un usuario autenticado
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Sesión cerrada.");
    navigate("/"); // Redirige a la página principal
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Juntoo</Link>
      </div>
      <button className="navbar-menu-btn" onClick={toggleMenu}>
        ☰
      </button>
      <ul className="navbar-links">
        <li>
          <Link to="/about">Acerca de</Link>
        </li>
        <li>
          <Link to="/contact">Contacto</Link>
        </li>
        {user && (
          <>
            <li>
              <Link to="/activities" className="navbar-activities">
                Actividades
              </Link>
            </li>
            <li className="navbar-profile">
              <button
                className="navbar-profile-icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <img
                  src="https://via.placeholder.com/40"
                  alt="Perfil"
                  className="navbar-profile-pic"
                />
              </button>
              {isMenuOpen && (
                <ul className="navbar-dropdown">
                  <li>
                    <Link to="/account">Mi cuenta</Link>
                  </li>
                  <li>
                    <Link to="/posts">Mis publicaciones</Link>
                  </li>
                  <li>
                    <Link to="/messages">Mensajes</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}
        {!user && (
          <li>
            <Link to="/login" className="navbar-login">
              Ingresar
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
