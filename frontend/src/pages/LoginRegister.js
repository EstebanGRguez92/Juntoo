import React, { useState } from "react";
import "./../styles/LoginRegister.css";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { registerUser, loginUser } from "./../api/auth";

const LoginRegister = () => {
  const navigate = useNavigate(); // Crear instancia de navigate
  const [isRegister, setIsRegister] = useState(true); // Alternar entre registro e inicio de sesión
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (isRegister && !formData.username.trim()) {
      newErrors.username = "El nombre de usuario es obligatorio.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "El correo debe tener un formato válido.";
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, incluir una letra, un número y un signo.";
    }

    if (isRegister && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      if (isRegister) {
        // Llamar al endpoint de registro
        const response = await registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
  
        if (response.message) {
          alert(response.message);
          if (response.message.includes("Usuario registrado exitosamente")) {
            setIsRegister(false); // Cambiar a modo "Iniciar sesión"
          }
        } else {
          alert("Error en el registro. Revisa los datos.");
        }
      } else {
        // Llamar al endpoint de inicio de sesión
        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
  
        if (response.message) {
          alert(response.message);
          if (response.message.includes("Inicio de sesión exitoso")) {
            // Guardar datos del usuario (por ejemplo, en localStorage)
            localStorage.setItem("user", JSON.stringify(response.user));
            // Redirigir a la página de actividades
            navigate("/activities");
          }
        } else {
          alert("Error al iniciar sesión. Verifica tus credenciales.");
        }
      }
    } catch (error) {
      console.error("Error en la conexión con el backend:", error);
      alert("Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <div className="login-register-container">
      <div className="form-wrapper">
        <h2>{isRegister ? "Registro" : "Iniciar Sesión"}</h2>
        <form onSubmit={handleFormSubmit} className="form-container">
          {isRegister && (
            <div>
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Tu nombre de usuario"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
          )}
          <div>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Tu correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Tu contraseña"
              value={formData.password}
              onChange={handleInputChange}
              required
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="La contraseña debe tener al menos 8 caracteres, incluir una letra, un número y un signo."
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          {isRegister && (
            <div>
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
              />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
          )}
          <button type="submit" className="form-button">
            {isRegister ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>

        <div className="social-login">
          <p>O ingresa con:</p>
          <button className="google-button">Google</button>
          <button className="facebook-button">Facebook</button>
          <button className="twitter-button">X</button>
        </div>
        <p onClick={() => setIsRegister(!isRegister)} className="toggle-link">
          {isRegister
            ? "¿Ya tienes una cuenta? Inicia sesión aquí."
            : "¿No tienes una cuenta? Regístrate aquí."}
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
