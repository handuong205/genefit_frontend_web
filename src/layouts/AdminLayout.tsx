import AdminSidebar from "../components/layout/admin/AdminSidebar";

export type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = (props: AdminLayoutProps) => {
  return (
    <div className="flex h-screen gap-2">
      <div className="w-64">
        <AdminSidebar />
      </div>

      <div className="flex-1 overflow-auto rounded-l-2xl border-l border-primary shadow-primary-lg">
        <>
            {props.children}
        </>
      </div>
    </div>
  )
}



export default AdminLayout