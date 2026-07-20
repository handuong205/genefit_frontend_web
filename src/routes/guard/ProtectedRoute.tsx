import { AUTH_ROUTE } from "../../constants/routes/auth.route";
import { useAuthStore } from "../../stores/auth.store"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const scope = String(user?.scope ?? user?.role ?? "").toUpperCase();

    if (!token || !user) {
        return <Navigate to={AUTH_ROUTE.ADMIN_LOGIN} replace />;
    }

    if (!scope.includes("ADMIN")) {
        return <Navigate to={AUTH_ROUTE.ADMIN_LOGIN} replace />;
    }
  return (
    <Outlet />
  )
}

export default ProtectedRoute;
