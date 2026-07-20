import React, { useEffect, useState } from 'react';
import UserEditModal from './Users.modal.edit';
import { getUserByIdService } from '../../../pages/admin/user/services/getUsers.service';
import { deleteUserService } from '../../../pages/admin/user/services/deleteUser.service';
import type { User as UserModel } from '../../../pages/admin/user/models/User.model';
import { ActionConfirmModal } from '../../template/ActionConfirmModal';
import { toast } from 'react-toastify';
import { X, Eye } from 'lucide-react';

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number | null;
    onRefreshList?: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, userId, onRefreshList }) => {
    const [user, setUser] = useState<UserModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (isOpen && userId) {
                setIsLoading(true);
                const data = await getUserByIdService(userId);
                setUser(data);
                setIsLoading(false);
            } else {
                setUser(null);
            }
        };
        fetchUser();
    }, [userId, isOpen]);

    const handleDeleteUser = async () => {
        if (!userId) return;
        setIsDeleting(true);
        try {
            await deleteUserService(userId);
            toast.success("Hủy kích hoạt người dùng thành công");
            setIsDeleteModalOpen(false);
            onClose();
            if (onRefreshList) onRefreshList();
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Không thể hủy kích hoạt người dùng");
        } finally {
            setIsDeleting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-sm overflow-y-auto">
            <div className="relative bg-surface-container-lowest w-full max-w-[1000px] rounded-2xl shadow-2xl flex flex-col max-h-[95vh] border border-outline-variant overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-800 uppercase flex items-center gap-2">
                        {/* <Eye className="w-5 h-5 text-primary" /> */}
                        Chi tiết người dùng
                    </h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Đóng"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center p-8 min-h-[400px] text-secondary bg-gray-50/50">
                        <span className="material-symbols-outlined animate-spin mr-2">refresh</span> Đang tải dữ liệu...
                    </div>
                ) : (
                    /* Modal Content */
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gray-50/50">
                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Left Column: Account Overview */}
                            <div className="md:col-span-4 glass-card rounded-xl p-6 border border-outline-variant flex flex-col items-center text-center bg-white shadow-sm">
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 rounded-full ring-4 ring-primary-container p-1 bg-surface-container">
                                        <img className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS0y-K_YHJSnjzFhzzB0ChrbDfKYi5PQc9hmsFZ4bWQpD_PmD3jwoZpQX7P6x6P2nXsV5Zxg-GUIqO6twPdSTSBfaljDiDNFondd-GquNMovyWTmE-uAVFClXLI1M56Pd3mE-fKDn6DcubAfFP0Usqiv-JnG_bD9FXMa_EKbhc44hfvIX0qPgcYHHNTroic8I_O4GFGyzA8dGHBIDkHgyO7HKp_qz4pHZBDBKopMSlNPg_70zwxQ9waKNGoQ6kslUvBd1SSKeawEU" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full border-2 border-white">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    </div>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{user?.username}</h3>
                                <div className="flex flex-wrap justify-center gap-2 mb-6">
                                    <span className="px-2 py-0.5 bg-primary-container text-on-primary-container text-xs font-medium rounded-full">{user?.role}</span>
                                    <span className="px-2 py-0.5 bg-surface-container-highest text-secondary text-xs font-medium rounded-full">Hoạt động</span>
                                </div>
                                <div className="w-full space-y-3 text-left pt-4 border-t border-outline-variant">
                                    <div>
                                        <p className="text-xs font-bold text-secondary uppercase tracking-wider">Email</p>
                                        <p className="text-sm text-on-surface truncate">{user?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-secondary uppercase tracking-wider">Thành viên từ</p>
                                        <p className="text-sm text-on-surface">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : (user?.userProfile?.createdAt ? new Date(user.userProfile.createdAt).toLocaleDateString('vi-VN') : 'N/A')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Details & Metrics */}
                            <div className="md:col-span-8 space-y-6">
                                <div className="glass-card rounded-xl p-6 border border-outline-variant bg-white shadow-sm">
                                    <h4 className="font-label-md text-label-md text-on-surface mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">person</span> Hồ sơ
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-secondary">Tên đăng nhập</p>
                                            <p className="text-body-md font-medium">{user?.username || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">Họ và tên</p>
                                            <p className="text-body-md font-medium">{`${user?.userProfile?.firstName || ''} ${user?.userProfile?.lastName || ''}`.trim() || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">Giới tính</p>
                                            <p className="text-body-md font-medium">
                                                {user?.userProfile?.gender === 'FEMALE' || user?.userProfile?.gender === 'female' ? 'Nữ' :
                                                    user?.userProfile?.gender === 'MALE' || user?.userProfile?.gender === 'male' ? 'Nam' :
                                                        user?.userProfile?.gender || 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">Tuổi</p>
                                            <p className="text-body-md font-medium">{user?.userProfile?.age ? `${user?.userProfile?.age} tuổi` : 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">Ngày sinh</p>
                                            <p className="text-body-md font-medium">{user?.userProfile?.dateOfBirth ? new Date(user.userProfile.dateOfBirth).toLocaleDateString('vi-VN') : 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">Nghề nghiệp</p>
                                            <p className="text-body-md font-medium">{user?.userProfile?.occupation || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="glass-card rounded-xl p-4 border border-outline-variant bg-white shadow-sm">
                                        <h4 className="text-label-sm font-bold text-on-surface mb-3">Chỉ số sức khỏe</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-secondary">Chiều cao</span>
                                                <span className="font-bold">{user?.userProfile?.heightCm || '-'} cm</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-secondary">Cân nặng</span>
                                                <span className="font-bold">{user?.userProfile?.weightKg || '-'} kg</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-secondary">Cân nặng ban đầu</span>
                                                <span className="font-bold">{user?.userProfile?.initialWeight || '-'} kg</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-secondary">Cân nặng mục tiêu</span>
                                                <span className="font-bold">{user?.userProfile?.targetWeightKg || '-'} kg</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="glass-card rounded-xl p-4 border-l-4 border-primary bg-white shadow-sm">
                                        <h4 className="text-label-sm font-bold text-on-surface mb-3">Mục tiêu hiện tại</h4>
                                        <div className="bg-primary-container/20 p-2 rounded text-xs font-medium text-on-primary-container mb-2">
                                            {user?.userProfile?.goal === 'LOSS_WEIGHT' || user?.userProfile?.goal === 'loss' ? 'Giảm cân' :
                                                user?.userProfile?.goal === 'GAIN_MUSCLE' || user?.userProfile?.goal === 'muscle' ? 'Tăng cơ' :
                                                    user?.userProfile?.goal === 'MAINTAIN_WEIGHT' || user?.userProfile?.goal === 'maintenance' ? 'Duy trì' :
                                                        user?.userProfile?.goal || 'Chưa thiết lập mục tiêu'}
                                        </div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-secondary">Calo mục tiêu</span>
                                            <span className="text-primary font-bold">{user?.userProfile?.baseTargetCalorie || '-'} kcal</span>
                                        </div>
                                        <div className="flex justify-between text-xs mb-1 mt-2">
                                            <span className="text-secondary">Ngày bắt đầu</span>
                                            <span className="font-medium">{user?.userProfile?.goalStartDate ? new Date(user.userProfile.goalStartDate).toLocaleDateString('vi-VN') : '-'}</span>
                                        </div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-secondary">Dự kiến hoàn thành</span>
                                            <span className="font-medium">{user?.userProfile?.targetDate ? new Date(user.userProfile.targetDate).toLocaleDateString('vi-VN') : '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Medical & Activity Information */}
                            <div className="md:col-span-12 glass-card rounded-xl p-6 border border-outline-variant bg-white shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-label-md text-label-md text-on-surface">Thông tin Y tế & Hoạt động</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-primary text-lg">directions_run</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-secondary uppercase">Mức độ hoạt động</p>
                                            <p className="text-sm font-bold">
                                                {user?.userProfile?.activityLevel === 'SEDENTARY' || user?.userProfile?.activityLevel === 'sedentary' ? 'Ít vận động' :
                                                    user?.userProfile?.activityLevel === 'LIGHTLY_ACTIVE' || user?.userProfile?.activityLevel === 'moderate' ? 'Vận động nhẹ' :
                                                        user?.userProfile?.activityLevel === 'MODERATELY_ACTIVE' || user?.userProfile?.activityLevel === 'active' ? 'Vận động vừa' :
                                                            user?.userProfile?.activityLevel === 'VERY_ACTIVE' || user?.userProfile?.activityLevel === 'very-active' ? 'Rất năng động' :
                                                                user?.userProfile?.activityLevel || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-error text-lg">medical_services</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-secondary uppercase">Bệnh nền</p>
                                            <p className="text-sm font-bold">
                                                {user?.userProfile?.medicalConditions && user.userProfile.medicalConditions.length > 0
                                                    ? user.userProfile.medicalConditions.join(', ')
                                                    : 'Không có'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-tertiary text-lg">coronavirus</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-secondary uppercase">Dị ứng</p>
                                            <p className="text-sm font-bold">
                                                {user?.userProfile?.allergies && user.userProfile.allergies.length > 0
                                                    ? user.userProfile.allergies.join(', ')
                                                    : 'Không có'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <UserEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />

            <ActionConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Xác nhận hủy kích hoạt"
                message="Bạn có chắc chắn muốn hủy kích hoạt người dùng này không? Người dùng sẽ không thể đăng nhập sau khi bị hủy kích hoạt."
                onConfirm={handleDeleteUser}
                type="delete"
                isLoading={isDeleting}
            />
        </div>
    );
};

export default UserProfileModal;
