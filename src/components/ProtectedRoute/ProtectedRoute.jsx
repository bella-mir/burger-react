import React from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../services/selectors/auth";

export const ProtectedRoute = ({ onlyUnAuth = false, children }) => {
  const user = useSelector(getUserInfo);
  const location = useLocation();

  if (!user.name && !onlyUnAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  } else if (onlyUnAuth && user?.name) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};
