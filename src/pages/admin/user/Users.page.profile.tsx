import React, { useEffect, useState } from 'react';
import UserEditModal from './Users.modal.edit';
import { getUserByIdService } from './services/getUsers.service';
import { deleteUserService } from './services/deleteUser.service';
import type { User as UserModel } from './models/User.model';
import { ActionConfirmModal } from '../../../components/template/ActionConfirmModal';
import { toast } from 'react-toastify';

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm">
            <div className="bg-background w-full max-w-[1000px] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg relative flex flex-col">
                {/* Modal Header */}
                <div className="sticky top-0 z-10 bg-background border-b border-outline-variant px-8 pt-6 pb-4 flex justify-between items-start">
                    <div>
                        {/* <div className="flex items-center gap-2 text-label-sm font-label-sm text-secondary mb-1">
                            <span>User Management</span>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="text-primary font-bold">{user?.username || 'Loading...'}</span>
                        </div> */}
                        <h1 className="font-headline-lg text-headline-lg text-on-surface">Chi tiết người dùng</h1>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {isLoading ? (
                    <div className="p-8 flex items-center justify-center min-h-[400px] text-secondary">
                        <span className="material-symbols-outlined animate-spin mr-2">refresh</span> Loading details...
                    </div>
                ) : (
                    /* Modal Content */
                    <div className="p-8 space-y-8">
                        {/* Tabs */}
                        {/* <nav className="flex gap-6 border-b border-outline-variant">
                            <span className="font-label-md text-label-md text-primary font-bold border-b-2 border-primary cursor-pointer pb-2 px-1">User Details</span>
                            <span className="font-label-md text-label-md text-secondary font-medium cursor-pointer hover:text-primary transition-colors pb-2 px-1">Permissions</span>
                            <span className="font-label-md text-label-md text-secondary font-medium cursor-pointer hover:text-primary transition-colors pb-2 px-1">History</span>
                        </nav> */}

                        {/* Action Buttons */}
                        {/* <div className="flex justify-end gap-3">
                            <button onClick={() => setIsEditModalOpen(true)} className="px-4 py-2 rounded-lg border border-outline text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center gap-2 cursor-pointer">
                                <span className="material-symbols-outlined text-sm">edit</span> Edit Profile
                            </button>
                            <button onClick={() => setIsDeleteModalOpen(true)} className="px-4 py-2 rounded-lg bg-error text-on-error font-label-md text-label-md hover:brightness-110 flex items-center gap-2 shadow-sm transition-all cursor-pointer">
                                <span className="material-symbols-outlined text-sm">person_off</span> Deactivate
                            </button>
                        </div> */}

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Left Column: Account Overview */}
                            <div className="md:col-span-4 glass-card rounded-xl p-6 border border-outline-variant flex flex-col items-center text-center">
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
                                    <span className="px-2 py-0.5 bg-surface-container-highest text-secondary text-xs font-medium rounded-full">Active</span>
                                </div>
                                <div className="w-full space-y-3 text-left pt-4 border-t border-outline-variant">
                                    <div>
                                        <p className="text-xs font-bold text-secondary uppercase tracking-wider">Email</p>
                                        <p className="text-sm text-on-surface truncate">{user?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-secondary uppercase tracking-wider">Member Since</p>
                                        <p className="text-sm text-on-surface">March 12, 2023</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Details & Metrics */}
                            <div className="md:col-span-8 space-y-6">
                                <div className="glass-card rounded-xl p-6 border border-outline-variant">
                                    <h4 className="font-label-md text-label-md text-on-surface mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">person</span> Personal Profile
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-secondary">Username</p>
                                            <p className="text-body-md font-medium">{user?.username}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">Gender</p>
                                            <p className="text-body-md font-medium">{user?.userProfile?.gender || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">Age</p>
                                            <p className="text-body-md font-medium">{user?.userProfile?.age ? `${user?.userProfile?.age} Years` : 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">Nationality</p>
                                            <p className="text-body-md font-medium">Vietnam</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="glass-card rounded-xl p-4 border border-outline-variant">
                                        <h4 className="text-label-sm font-bold text-on-surface mb-3">Health Metrics</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-secondary">Height</span>
                                                <span className="font-bold">{user?.userProfile?.heightCm || '-'} cm</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-secondary">Weight</span>
                                                <span className="font-bold">{user?.userProfile?.weightKg || '-'} kg</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-secondary">Target Weight</span>
                                                <span className="font-bold">{user?.userProfile?.targetWeightKg || '-'} kg</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="glass-card rounded-xl p-4 border-l-4 border-primary">
                                        <h4 className="text-label-sm font-bold text-on-surface mb-3">Current Goal</h4>
                                        <div className="bg-primary-container/20 p-2 rounded text-xs font-medium text-on-primary-container mb-2">
                                            {user?.userProfile?.goal || 'No goal set'}
                                        </div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-secondary">Target Calories</span>
                                            <span className="text-primary font-bold">{user?.userProfile?.baseTargetCalorie || '-'} kcal</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden mt-2">
                                            <div className="h-full bg-primary" style={{ width: '64%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Snapshot */}
                            <div className="md:col-span-12 glass-card rounded-xl p-6 border border-outline-variant">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-label-md text-label-md text-on-surface">Activity Snapshot</h4>
                                    <button className="text-primary text-xs font-bold hover:underline cursor-pointer">View Analytics</button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary text-lg">directions_run</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-secondary uppercase">Activity Level</p>
                                            <p className="text-sm font-bold">{user?.userProfile?.activityLevel || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-tertiary text-lg">water_drop</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-secondary uppercase">Water</p>
                                            <p className="text-sm font-bold">2.4L</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-secondary text-lg">bedtime</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-secondary uppercase">Sleep</p>
                                            <p className="text-sm font-bold">7h 12m</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-error text-lg">favorite</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-secondary uppercase">Heart</p>
                                            <p className="text-sm font-bold">64 bpm</p>
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
