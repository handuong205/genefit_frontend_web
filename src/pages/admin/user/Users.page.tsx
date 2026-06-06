import { useState } from "react";
import { CRUDPageTemplate, type Column } from "../../../components/template/CRUDTemplate"
import { CRUDModalTemplate } from "../../../components/template/CRUDModal";
import Loading from "../../../components/common/loading/Loading";
import { FormInput } from "../../../components/common/form/FormInput";
import { ActionConfirmModal } from "../../../components/template/ActionConfirmModal";

type typeData = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const data: typeData[] = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', role: 'Admin' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', role: 'User' },
]
const columns: Column<typeData>[] = [
  {
    header: 'ID',
    accessor: 'id',
    sortable: true,
    className: ' text-center',
  },
  {
    header: 'Name',
    accessor: 'name',
    sortable: true,
  },
  {
    header: 'Email',
    accessor: 'email',
    
  },
  {
    header: 'Role',
    accessor: 'role',
    sortable: true,
  }
]



const UsersPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const canWrite = true; // Giả sử có quyền viết, bạn có thể thay đổi logic này dựa trên quyền thực tế của người dùng

  const handleCreateOpen = () => {
    if (!canWrite) return;
    setIsCreateOpen(true);
  };

  const handleConfirm = () => {
    setIsDeleteOpen(true);
  }

  return (
    <>
      <CRUDPageTemplate
        title="Quản lý người dùng"
        columns={columns}
        data={data}
        onAdd={handleCreateOpen}
        onEdit={(item) => console.log("Edit user", item)}
        onDelete={handleConfirm}
        onStatusChange={(item) => console.log("Change status", item)}
        onView={(item) => console.log("View user", item)}
        filters={[
          {
            key: "role",
            label: "Vai trò",
            options: [
              { value: "Admin", label: "Admin" },
              { value: "User", label: "User" },
            ],
          },
          
        ]}
        
      />

      {isCreateOpen ? (
        <CRUDModalTemplate
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Người dùng"
          maxWidth="max-w-1/2"
          mode="create"
          children={
          <div className="p-4">
            <FormInput
              type="text"
              label="Tên người dùng"
              placeholder="Nhập tên người dùng"
              register={{ name: "name" }}
            />
            <Loading/>
            <FormInput
              type="file"
              label="Avatar"
              placeholder="Tải lên ảnh đại diện"
              register={{ name: "avatar" }}
              uploadFolder="USER"
              onUploadSuccess={(url) => console.log("Uploaded avatar URL:", url)}
              setIsExternalLoading={(loading) => console.log("Avatar upload loading:", loading)}
            />
          </div>
          }
        />
      ) : null}

      {isDeleteOpen ? (
        <ActionConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Xác nhận xóa"
          onConfirm={() => {
            // Logic for confirming delete action
          }}
          type="delete"
          message="xóa"
        />
      ) : null}
    </>
  );
}


export default UsersPage