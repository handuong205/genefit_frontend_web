import { Outlet } from "react-router-dom"
import AdminLayout from "../layouts/AdminLayout"


const AdminRoute = ()  => {
  return (
    <AdminLayout>
      <Outlet/>
    </AdminLayout>
  )
}



export default AdminRoute