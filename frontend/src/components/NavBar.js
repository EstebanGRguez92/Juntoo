import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menú móvil
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // Dropdown del perfil
  const profileRef = useRef(null); // Referencia al dropdown del perfil
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Sesión cerrada.");
    closeMenu();
    navigate("/");
  };

  // Detecta clics fuera del dropdown de perfil
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        closeProfileDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          Juntoo
        </Link>
      </div>

      {/* Botón hamburguesa (móvil) */}
      <button className="navbar-menu-btn" onClick={toggleMenu}>
        ☰
      </button>

      {/* Menú principal (escritorio) */}
      <ul className="navbar-links">
        <li>
          <Link to="/about" onClick={closeMenu}>
            Acerca de
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={closeMenu}>
            Contacto
          </Link>
        </li>
        {user && (
          <li>
            <Link to="/activities" onClick={closeMenu}>
              Actividades
            </Link>
          </li>
        )}
      </ul>

      {/* Ícono de perfil (escritorio) */}
      {user && (
        <div className="navbar-profile" ref={profileRef}>
          <button
            className="navbar-profile-icon"
            onClick={toggleProfileDropdown}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Perfil"
              className="navbar-profile-pic"
            />
          </button>
          {isProfileDropdownOpen && (
            <ul className="navbar-dropdown">
              <li>
                <Link to="/account" onClick={closeProfileDropdown}>
                  Mi cuenta
                </Link>
              </li>
              <li>
                <Link to="/posts" onClick={closeProfileDropdown}>
                  Mis publicaciones
                </Link>
              </li>
              <li>
                <Link to="/messages" onClick={closeProfileDropdown}>
                  Mensajes
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </li>
            </ul>
          )}
        </div>
      )}

      {/* Menú móvil */}
      <div className={`navbar-mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <button className="navbar-mobile-close" onClick={closeMenu}>
          ✖
        </button>
        <ul>
          <li>
            <Link to="/about" onClick={closeMenu}>
              Acerca de
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contacto
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/activities" onClick={closeMenu}>
                  Actividades
                </Link>
              </li>
              <hr />
              <li>
                <Link to="/account" onClick={closeMenu}>
                  Mi cuenta
                </Link>
              </li>
              <li>
                <Link to="/posts" onClick={closeMenu}>
                  Mis publicaciones
                </Link>
              </li>
              <li>
                <Link to="/messages" onClick={closeMenu}>
                  Mensajes
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
