import { AUTH_ROUTE } from "../../constants/routes/auth.route";
import { useAuthStore } from "../../stores/auth.store"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const user = useAuthStore((state) => state.user);
    

    if (!user) {
        <Outlet />
    }
  return (
    <Outlet />
  )
}

export default ProtectedRoute;