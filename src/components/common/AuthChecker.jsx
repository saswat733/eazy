import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
// import Layout from "./Layout";
import usePermission from "../../hooks/usePermission";
import { lazy } from "react";
const Dashboard=lazy(()=>import("../../views/admin/default"))

export function RequireAuth({ componentTitle }) {
  const { isAuthenticated } = useSelector(selectUser);
  const { permissions } = usePermission(componentTitle);

  const location = useLocation();

  // if (!isAuthenticated) {
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }
  // if (!permissions.view) {
  //   return <Navigate to="/not-allowed" state={{ from: location }} replace />;
  // }

  return <Dashboard />;
}

export function PublicRoutes() {
  const { isAuthenticated } = useSelector(selectUser);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Outlet />;
  }
  const query = location?.state?.from?.search || "";
  const pathname = location?.state?.from?.pathname || "/dashboard";
  const to = query ? pathname + query : pathname;

  return <Navigate to={to} state={{ from: location }} replace />;
}
