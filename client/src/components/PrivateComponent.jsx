import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateComponent() {
  const auth = localStorage.getItem("user");
  const admin = localStorage.getItem("admin");
  if (admin) {
    localStorage.removeItem("admin");
  }

  return auth ? <Outlet /> : <Navigate to="login" />;
}

export default PrivateComponent;
