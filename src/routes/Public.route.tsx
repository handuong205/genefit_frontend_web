import { Outlet } from "react-router-dom"
import PublicLayout from "../layouts/PublicLayout"


const PublicRoute = () => {
  return (
    <PublicLayout>
        <Outlet/>
    </PublicLayout>
  )
}


export default PublicRoute