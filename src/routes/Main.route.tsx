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
// import UserProfilePage from "../pages/admin/user/Users.page.profile";
import SettingsPage from "../pages/admin/setting/Settings.page";
import ProtectedRoute from "./guard/ProtectedRoute";
import { AUTH_ROUTE } from "../constants/routes/auth.route";
import AdminLogin from "../pages/admin/auth/AdminLogin.page";
import ToastNoti from "../components/common/toast/ToastNoti";
import FoodsPage from "../pages/admin/food/Food.page";
import SubscriptionPage from "../pages/admin/subscription/Subscription.page";
import PaymentManagementPage from "../pages/admin/payment/Payment.page.history";
import Verify from "../pages/verify";
import UserRegisterPage from "../pages/user/auth/UserRegister.page";

const MainRoute = () => {
  return (
    <BrowserRouter>
      <ToastNoti />
      <Routes>
        {/* <Route path={PUBLIC_ROUTE.HOME} element={<HomePage />} /> */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path={PUBLIC_ROUTE.HOME} element={<HomePage />} />
          <Route path={PUBLIC_ROUTE.ABOUT} element={<AboutPage />} />
          <Route path={PUBLIC_ROUTE.VERIFY} element={<Verify />} />

        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminRoute />}>

            <Route path={ADMIN_ROUTE.ADMIN} element={<Navigate to={ADMIN_ROUTE.DASHBOARD} replace />} />
            <Route path={ADMIN_ROUTE.DASHBOARD} element={<DashboardPage />} />
            <Route path={ADMIN_ROUTE.USERS} element={<UsersPage />} />
            {/* <Route path={ADMIN_ROUTE.USER_PROFILE} element={<UserProfilePage />} /> */}
            <Route path={ADMIN_ROUTE.SETTINGS} element={<SettingsPage />} />
            <Route path={ADMIN_ROUTE.FOODS} element={<FoodsPage />} />
            <Route path={ADMIN_ROUTE.SUBSCRIPTIONS} element={<SubscriptionPage />} />
            <Route path={ADMIN_ROUTE.PAYMENTS} element={<PaymentManagementPage />} />
          </Route>
        </Route>
        <Route path={AUTH_ROUTE.ADMIN_LOGIN} element={<AdminLogin />} />
        <Route path={PUBLIC_ROUTE.REGISTER} element={<UserRegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </BrowserRouter>
  );
};

export default MainRoute;
