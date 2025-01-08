import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Usuario autenticado:", user); // Agrega este log

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};


export default ProtectedRoute;
