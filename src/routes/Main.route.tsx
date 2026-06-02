import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage.home";
import AboutPage from "../pages/about/AboutPage.about";
import { PUBLIC_ROUTE } from "../constants/routes/public.route";
import PublicRoute from "./Public.route";
import NotFoundPage from "../pages/NotFound.page";

const MainRoute = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        {/* <Route path={PUBLIC_ROUTE.HOME} element={<HomePage />} /> */}
        <Route element={ <PublicRoute/>}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path={PUBLIC_ROUTE.HOME} element={<HomePage />} />
          <Route path={PUBLIC_ROUTE.ABOUT} element={<AboutPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
    </BrowserRouter>
  );
};

export default MainRoute;
