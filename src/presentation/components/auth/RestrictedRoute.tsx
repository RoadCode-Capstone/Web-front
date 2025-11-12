import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const RestrictedRoute = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace />; // 또는 '/dashboard' 등
  }

  return <Outlet />;
};

export default RestrictedRoute;
