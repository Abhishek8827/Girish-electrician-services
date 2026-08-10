import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const token = localStorage.getItem("girish_admin_token");

  if (!token) return <Navigate to="/admin" replace />;
  return element;
}

export default ProtectedRoute;
