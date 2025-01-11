import React, { useState } from "react";
import "./../styles/LoginRegister.css";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "./../api/auth";

const LoginRegister = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
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
    if (!validateForm()) return;

    try {
      if (isRegister) {
        const response = await registerUser(formData);
        if (response?.message?.includes("Usuario registrado exitosamente")) {
          alert(response.message);
          setIsRegister(false);
        } else {
          throw new Error(response?.message || "Error en el registro.");
        }
      } else {
        const response = await loginUser(formData);
        if (response?.message?.includes("Inicio de sesión exitoso")) {
          console.log("Datos del usuario recibidos del servidor:", response.user);
          localStorage.setItem("user", JSON.stringify(response.user));
          console.log("Datos guardados en localStorage:", localStorage.getItem("user"));
          alert(response.message);
          navigate("/activities");
      } else {
          throw new Error(response?.message || "Error al iniciar sesión.");
        }
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      alert(error.message || "Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <div className="login-register-container">
      <div className="form-wrapper">
        <h2>{isRegister ? "Registro" : "Iniciar Sesión"}</h2>
        <form onSubmit={handleFormSubmit}>
          {isRegister && (
            <>
              <label>Nombre de usuario</label>
              <input
                type="text"
                name="username"
                placeholder="Ingresa tu nombre de usuario"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </>
          )}
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="Ingresa tu correo"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          {isRegister && (
            <>
              <label>Confirmar contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </>
          )}
          <button className="submit-btn">
            {isRegister ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>

        {/* Divisor con texto */}
        <div className="divider">
          <span>O puedes continuar con tus redes sociales</span>
        </div>

        <div className="social-login">
          <button className="google-btn">Continuar con Google</button>
          <button className="facebook-btn">Continuar con Facebook</button>
          <button className="x-btn">Continuar con X</button>
        </div>
        <p className="toggle-form">
          {isRegister ? (
            <>¿Ya tienes una cuenta? <span onClick={() => setIsRegister(false)}>Inicia sesión aquí</span>.</>
          ) : (
            <>¿No tienes una cuenta? <span onClick={() => setIsRegister(true)}>Regístrate aquí</span>.</>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
