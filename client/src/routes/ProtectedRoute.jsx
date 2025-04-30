// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  // Giriş yapılmamışsa login sayfasına gönder
  if (!token) return <Navigate to="/" />;

  // Rol yetkili değilse ana sayfaya yönlendir
  if (!allowedRoles.includes(rol)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
