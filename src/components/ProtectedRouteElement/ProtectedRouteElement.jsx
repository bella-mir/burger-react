import React from "react";
import { useAuth } from "../../hooks/use-auth";
import { Navigate } from "react-router-dom";

export const ProtectedRouteElement = ({ children }) => {
  const auth = useAuth();

  return auth?.user?.name ? children : <Navigate to="/login" />;
};
