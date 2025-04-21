// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const decoded = JSON.parse(atob(token.split(".")[1]));

  if (!allowedRoles.includes(decoded.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
