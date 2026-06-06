import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage.home";
import AboutPage from "../pages/about/AboutPage.about";
import { PUBLIC_ROUTE } from "../constants/routes/public.route";
import PublicRoute from "./Public.route";
import NotFoundPage from "../pages/NotFound.page";
import AdminRoute from "./Admin.route";
import { ADMIN_ROUTE } from "../constants/routes/admin.route";
import DashboardPage from "../pages/admin/dashboard/Dashboard.page";
import UsersPage from "../pages/admin/user/Users.page";
import SettingsPage from "../pages/admin/setting/Settings.page";
import ProtectedRoute from "./guard/ProtectedRoute";
import { AUTH_ROUTE } from "../constants/routes/auth.route";
import AdminLogin from "../pages/admin/auth/AdminLogin.page";
import ToastNoti from "../components/common/toast/ToastNoti";

const MainRoute = () => {
  return (
    <BrowserRouter>
      <ToastNoti/>
      <Routes>
        {/* <Route path={PUBLIC_ROUTE.HOME} element={<HomePage />} /> */}
        <Route element={ <PublicRoute/>}>
          <Route path="/" element={<Navigate to="/home" replace />}/>
          <Route path={PUBLIC_ROUTE.HOME} element={<HomePage/>} />
          <Route path={PUBLIC_ROUTE.ABOUT} element={<AboutPage />}/>
        </Route>

        <Route element={<ProtectedRoute/>}>
          <Route element={<AdminRoute/>}>
          
          <Route path={ADMIN_ROUTE.ADMIN} element={<Navigate to={ADMIN_ROUTE.DASHBOARD} replace />}/>
          <Route path={ADMIN_ROUTE.DASHBOARD} element={<DashboardPage />}/>
          <Route path={ADMIN_ROUTE.USERS} element={<UsersPage />}/>
          <Route path={ADMIN_ROUTE.SETTINGS} element={<SettingsPage />}/>
        </Route>
        </Route>
        <Route path={AUTH_ROUTE.ADMIN_LOGIN} element={<AdminLogin />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
      
    </BrowserRouter>
  );
};

export default MainRoute;
