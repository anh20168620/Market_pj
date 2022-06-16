import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateAdminComponent() {
  const admin = localStorage.getItem("admin");

  return admin ? <Outlet /> : <Navigate to="login" />;
}

export default PrivateAdminComponent;
