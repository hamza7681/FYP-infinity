import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  const getAuth = () => {
    if (token) {
      return true;
    } else {
      return false;
    }
  };
  const auth = getAuth();
  return <>{auth ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoutes;
