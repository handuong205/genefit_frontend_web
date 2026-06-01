import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/home/HomePage.home"
import AboutPage from "../pages/about/AboutPage.about"

const MainRoute = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default MainRoute