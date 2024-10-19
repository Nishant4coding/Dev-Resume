import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token is not available, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children; // Allow access to the protected component
};

export default ProtectedRoute;
