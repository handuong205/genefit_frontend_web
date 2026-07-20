import React, { useEffect, useRef, useState } from 'react';
import { User, Scale, Zap, Info, X, Camera } from 'lucide-react';
import type { User as UserModel } from '../../../pages/admin/user/models/User.model';
import { toast } from 'react-toastify';
import { axiosClient } from '../../../api/axios.config';
import { getUserByIdService } from '../../../pages/admin/user/services/getUsers.service';

// Cloudinary config lấy trực tiếp từ biến môi trường Vite
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

interface UserEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    user?: UserModel | null;
}

const UserEditModal = ({ isOpen, onClose, user }: UserEditModalProps) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        heightCm: '' as number | string,
        weightKg: '' as number | string,
        age: '' as number | string,
        gender: 'MALE',
        goal: 'MAINTAIN_WEIGHT',
        activityLevel: 'SEDENTARY',
        targetWeightKg: '' as number | string,
        medicalConditions: '',
        allergies: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (isOpen && user?.userId) {
                setIsLoading(true);
                try {
                    const fullUser = await getUserByIdService(user.userId);
                    if (fullUser && fullUser.userProfile) {
                        setFormData({
                            firstName: fullUser.userProfile.firstName || '',
                            lastName: fullUser.userProfile.lastName || '',
                            dateOfBirth: fullUser.userProfile.dateOfBirth || '',
                            heightCm: fullUser.userProfile.heightCm || '',
                            weightKg: fullUser.userProfile.weightKg || '',
                            age: fullUser.userProfile.age || '',
                            gender: fullUser.userProfile.gender || 'MALE',
                            goal: fullUser.userProfile.goal || 'MAINTAIN_WEIGHT',
                            activityLevel: fullUser.userProfile.activityLevel || 'SEDENTARY',
                            targetWeightKg: fullUser.userProfile.targetWeightKg || '',
                            medicalConditions: fullUser.userProfile.medicalConditions?.join(', ') || '',
                            allergies: fullUser.userProfile.allergies?.join(', ') || ''
                        });
                        setAvatarUrl(fullUser.userProfile.avatarUrl || '');
                    } else {
                        setFormData({
                            firstName: '',
                            lastName: '',
                            dateOfBirth: '',
                            heightCm: '',
                            weightKg: '',
                            age: '',
                            gender: 'MALE',
                            goal: 'MAINTAIN_WEIGHT',
                            activityLevel: 'SEDENTARY',
                            targetWeightKg: '',
                            medicalConditions: '',
                            allergies: ''
                        });
                        setAvatarUrl('');
                    }
                } catch (error) {
                    console.error("Failed to fetch full user details", error);
                } finally {
                    setIsLoading(false);
                }
            } else if (!isOpen) {
                setFormData({
                    firstName: '',
                    lastName: '',
                    dateOfBirth: '',
                    heightCm: '',
                    weightKg: '',
                    age: '',
                    gender: 'MALE',
                    goal: 'MAINTAIN_WEIGHT',
                    activityLevel: 'SEDENTARY',
                    targetWeightKg: '',
                    medicalConditions: '',
                    allergies: ''
                });
                setAvatarUrl('');
            }
        };
        fetchUserData();
    }, [isOpen, user]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
        }));
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate
        if (!file.type.startsWith('image/')) {
            toast.error('Vui lòng chọn file ảnh!');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Ảnh phải nhỏ hơn 5MB!');
            return;
        }

        // Hiện preview ngay lập tức từ local file
        const localPreviewUrl = URL.createObjectURL(file);
        setAvatarUrl(localPreviewUrl);

        setIsUploadingAvatar(true);
        try {
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
            console.log('Uploading to:', cloudinaryUrl);
            console.log('Cloud name:', CLOUD_NAME, 'Upload preset:', UPLOAD_PRESET);

            const uploadData = new FormData();
            uploadData.append('file', file);
            uploadData.append('upload_preset', UPLOAD_PRESET);

            const cloudRes = await fetch(cloudinaryUrl, {
                method: 'POST',
                body: uploadData,
            });
            const cloudData = await cloudRes.json();
            console.log('Cloudinary response:', cloudData);

            if (cloudData.error) {
                toast.error(`Cloudinary lỗi: ${cloudData.error.message}`);
                setAvatarUrl(''); // reset về trống nếu lỗi
                return;
            }

            if (!cloudData.secure_url) {
                toast.error('Tải ảnh lên thất bại!');
                return;
            }

            const newAvatarUrl: string = cloudData.secure_url;
            // Cập nhật preview bằng URL từ Cloudinary
            setAvatarUrl(newAvatarUrl);

            // Lưu URL vào backend
            if (user?.userId) {
                await axiosClient.put(`/api/admin/users/${user.userId}/avatar`, {
                    avatarUrl: newAvatarUrl
                });
            }
            toast.success('Cập nhật ảnh đại diện thành công!');
        } catch (error) {
            console.error('Avatar upload error:', error);
            toast.error('Lỗi khi cập nhật ảnh đại diện!');
            setAvatarUrl(''); // reset
        } finally {
            setIsUploadingAvatar(false);
            URL.revokeObjectURL(localPreviewUrl); // cleanup
            if (avatarInputRef.current) avatarInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const payload = {
                ...formData,
                dateOfBirth: formData.dateOfBirth === '' ? null : formData.dateOfBirth,
                heightCm: formData.heightCm === '' ? null : Number(formData.heightCm),
                weightKg: formData.weightKg === '' ? null : Number(formData.weightKg),
                age: formData.age === '' ? null : Number(formData.age),
                targetWeightKg: formData.targetWeightKg === '' ? null : Number(formData.targetWeightKg),
                medicalConditions: formData.medicalConditions ? formData.medicalConditions.split(',').map(s => s.trim()).filter(Boolean) : [],
                allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()).filter(Boolean) : [],
            };

            await axiosClient.put(`/api/admin/users/${user?.userId}/profile`, payload);
            toast.success("Cập nhật thông tin thành công");
            onClose();
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Có lỗi xảy ra khi cập nhật thông tin.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-sm overflow-y-auto"
            id="editModal"
            onClick={onClose}
        >
            {/* Modal Canvas */}
            <div
                className="relative bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[95vh] border border-outline-variant overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Avatar */}
                <div className="flex-none p-6 border-b border-outline-variant bg-surface-container-low flex justify-between items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent z-0"></div>
                    <div className="relative z-10 flex items-center gap-4">
                        {/* Avatar upload area */}
                        <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt="Avatar"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-md"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-2xl border-2 border-primary shadow-md">
                                    {user?.username?.substring(0, 2).toUpperCase() || 'U'}
                                </div>
                            )}
                            {/* Hover overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {isUploadingAvatar ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Camera className="w-6 h-6" />
                                )}
                            </div>
                            {/* Hidden file input */}
                            <input
                                ref={avatarInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarUpload}
                                disabled={isUploadingAvatar}
                            />
                        </div>
                        <div>
                            <h2 className="font-headline-sm text-on-surface font-bold">Chỉnh sửa người dùng</h2>
                            <p className="text-sm text-on-surface-variant mt-0.5">
                                {isUploadingAvatar ? 'Đang tải ảnh lên...' : 'Nhấn vào ảnh để thay đổi ảnh đại diện'}
                            </p>
                        </div>
                    </div>
                    <button
                        className="relative z-10 cursor-pointer p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors"
                        onClick={onClose}
                        title="Đóng"
                        type="button"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Form Body */}
                <form id="editUserForm" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-surface/30">
                    {/* Section 1: Personal Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-2">
                            <User className="w-5 h-5" />
                            <h3 className="font-label-md uppercase tracking-wider text-xs">Thông tin cá nhân</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Tên</label>
                                <input name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" placeholder="Nhập tên" type="text" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Họ</label>
                                <input name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" placeholder="Nhập họ" type="text" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Giới tính</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md appearance-none">
                                    <option value="FEMALE">Nữ</option>
                                    <option value="MALE">Nam</option>
                                    <option value="NON_BINARY">Khác</option>
                                    <option value="OTHER">Không muốn tiết lộ</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Ngày sinh</label>
                                <input name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" type="date" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Health Metrics */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-2">
                            <Scale className="w-5 h-5" />
                            <h3 className="font-label-md uppercase tracking-wider text-xs">Chỉ số sức khỏe</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Chiều cao (cm)</label>
                                <input name="heightCm" value={formData.heightCm} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" type="number" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Cân nặng (kg)</label>
                                <input name="weightKg" value={formData.weightKg} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" type="number" step="0.1" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Tuổi</label>
                                <input name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" type="number" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Mục tiêu (kg)</label>
                                <input name="targetWeightKg" value={formData.targetWeightKg} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" type="number" step="0.1" />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Activity & Goals */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-2">
                            <Zap className="w-5 h-5" />
                            <h3 className="font-label-md uppercase tracking-wider text-xs">Hoạt động & Mục tiêu</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Mức độ hoạt động</label>
                                <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md appearance-none">
                                    <option value="SEDENTARY">Ít vận động</option>
                                    <option value="LIGHTLY_ACTIVE">Vận động nhẹ</option>
                                    <option value="MODERATELY_ACTIVE">Vận động vừa phải</option>
                                    <option value="VERY_ACTIVE">Năng động</option>
                                    <option value="EXTRA_ACTIVE">Rất năng động</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Mục tiêu chính</label>
                                <select name="goal" value={formData.goal} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md appearance-none">
                                    <option value="LOSE_WEIGHT">Giảm cân</option>
                                    <option value="GAIN_WEIGHT">Tăng cân / Tăng cơ</option>
                                    <option value="MAINTAIN_WEIGHT">Duy trì</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Medical Information */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-2">
                            <Info className="w-5 h-5" />
                            <h3 className="font-label-md uppercase tracking-wider text-xs">Thông tin Y tế</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Bệnh nền (ngăn cách bằng dấu phẩy)</label>
                                <input name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" placeholder="VD: Huyết áp cao, Tiểu đường" type="text" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Dị ứng (ngăn cách bằng dấu phẩy)</label>
                                <input name="allergies" value={formData.allergies} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" placeholder="VD: Đậu phộng, Hải sản" type="text" />
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-surface-container border-t border-outline-variant flex justify-end gap-3">
                    <button
                        className="cursor-pointer px-4 py-2 text-sm font-medium text-on-surface-variant bg-surface-container hover:bg-surface-container-high rounded-lg transition disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={onClose}
                        type="button"
                        disabled={isLoading}
                    >
                        Hủy
                    </button>
                    <button
                        form="editUserForm"
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-medium text-on-primary bg-primary hover:bg-primary/90 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang lưu...' : 'Cập nhật'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserEditModal;
