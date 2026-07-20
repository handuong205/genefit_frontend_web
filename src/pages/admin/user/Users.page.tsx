import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CRUDPageTemplate, type Column } from "../../../components/template/CRUDTemplate"
import { ActionConfirmModal } from "../../../components/template/ActionConfirmModal";
import type { User } from "./models/User.model";
import { getUsersService, searchUsersService } from "./services/getUsers.service";
import { deleteUserService } from "./services/deleteUser.service";
import { restoreUserService } from "./services/restoreUser.service";
import { toast } from "react-toastify";
import UserProfileModal from "../../../components/admin/user/Users.page.profile";
import UserEditModal from "../../../components/admin/user/Users.modal.edit";

const columns: Column<User>[] = [
  {
    header: 'Tên người dùng',
    accessor: 'username',
    sortable: true,
    render(item) {
      return (
        <span className={item.isActive === false ? "text-gray-400 opacity-60" : "font-medium"}>
          {item.username}
        </span>
      );
    }
  },
  {
    header: 'Email',
    accessor: 'email',
    render(item) {
      return (
        <span className={item.isActive === false ? "text-gray-400 opacity-60" : ""}>
          {item.email}
        </span>
      );
    }
  },
  {
    header: 'Trạng thái',
    accessor: 'isActive',
    render(item) {
      return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.isActive !== false ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-500 border border-gray-200 opacity-60'}`}>
          {item.isActive !== false ? 'Hoạt động' : 'Đã khóa'}
        </span>
      );
    }
  },
  {
    header: 'Vai trò',
    accessor: 'role',
    sortable: true,
    render(item) {
      let bgColor = "bg-gray-100";
      let borderColor = "border-gray-200";
      let textColor = "text-gray-600";
      const roleUpper = item.role ? String(item.role).toUpperCase() : "";

      if (roleUpper.includes("ADMIN")) {
        bgColor = "bg-red-100";
        borderColor = "border-red-200";
        textColor = "text-red-600";
      } else if (roleUpper.includes("MEMBER") || roleUpper.includes("USER")) {
        bgColor = "bg-blue-100";
        borderColor = "border-blue-200";
        textColor = "text-blue-600";
      } else if (roleUpper.includes("EXPERT") || roleUpper.includes("CHUYÊN GIA")) {
        bgColor = "bg-yellow-100";
        borderColor = "border-yellow-200";
        textColor = "text-yellow-700";
      }

      return (
        <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full border ${bgColor} ${borderColor} ${item.isActive === false ? 'opacity-60 grayscale' : ''}`}>
          <span className={`text-sm font-medium ${textColor}`}>
            {item.role}
          </span>
        </div>
      );
    },
  }
];

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRestoreOpen, setIsRestoreOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProfileUserId, setSelectedProfileUserId] = useState<number | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchUsers = async () => {
    setIsTableLoading(true);
    try {
      const data = await getUsersService();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Không thể tải danh sách người dùng");
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    getUsersService()
      .then(setUsers)
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Không thể tải danh sách người dùng");
      })
      .finally(() => setIsTableLoading(false));
  }, []);

  const handleSearch = async (searchTerm?: string, filters?: any) => {
    setIsTableLoading(true);
    try {
      const keyword = searchTerm?.trim();
      const data = keyword
        ? await searchUsersService(keyword)
        : await getUsersService();
      let filteredData = data;

      if (filters?.role) {
        filteredData = filteredData.filter(user => user.role === filters.role);
      }

      setUsers(filteredData);
    } catch (error) {
      console.error("Error searching users:", error);
      toast.error("Có lỗi xảy ra khi tìm kiếm");
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleDeleteOpen = (item: User) => {
    setSelectedUser(item);
    setIsDeleteOpen(true);
  };

  const handleRestoreOpen = (item: User) => {
    setSelectedUser(item);
    setIsRestoreOpen(true);
  };

  const handleRestoreConfirm = async () => {
    if (!selectedUser) return;
    setIsTableLoading(true);
    try {
      await restoreUserService(selectedUser.userId);
      toast.success("Khôi phục tài khoản thành công");
      setIsRestoreOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error restoring user:", error);
      toast.error("Không thể khôi phục tài khoản người dùng");
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    setIsTableLoading(true);
    try {
      await deleteUserService(selectedUser.userId);
      toast.success("Hủy kích hoạt người dùng thành công");
      setIsDeleteOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Không thể hủy kích hoạt người dùng");
    } finally {
      setIsTableLoading(false);
    }
  };

  return (
    <>
      <CRUDPageTemplate<User>
        title="Quản lý người dùng"
        columns={columns}
        data={users}
        rowKey="userId"
        isTableLoading={isTableLoading}
        onSearch={handleSearch}
        onView={(item) => {
          setSelectedProfileUserId(item.userId);
          setIsProfileModalOpen(true);
        }}
        onEdit={(item) => {
          setSelectedUser(item);
          setIsEditModalOpen(true);
        }}
        onDelete={handleDeleteOpen}
        onRestore={handleRestoreOpen}
        onRefresh={fetchUsers}
        filters={[
          {
            key: "role",
            label: "Vai trò",
            options: [
              { value: "ADMIN", label: "Admin" },
              { value: "USER", label: "User" },
              { value: "GUEST", label: "Guest" }
            ],
          },
        ]}
      />

      {isDeleteOpen ? (
        <ActionConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Xác nhận hủy kích hoạt"
          onConfirm={handleDeleteConfirm}
          type="delete"
          message="Bạn có chắc chắn muốn hủy kích hoạt người dùng này không? Người dùng sẽ không thể đăng nhập sau khi bị hủy kích hoạt."
          isLoading={isTableLoading}
        />
      ) : null}

      {isRestoreOpen ? (
        <ActionConfirmModal
          isOpen={isRestoreOpen}
          onClose={() => setIsRestoreOpen(false)}
          title="Xác nhận khôi phục tài khoản"
          onConfirm={handleRestoreConfirm}
          type="restore"
          message={`Bạn có chắc chắn muốn khôi phục tài khoản "${selectedUser?.username}" không? Người dùng sẽ có thể đăng nhập lại.`}
          isLoading={isTableLoading}
        />
      ) : null}

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userId={selectedProfileUserId}
        onRefreshList={fetchUsers}
      />

      <UserEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
      />
    </>
  );
}

export default UsersPage;
