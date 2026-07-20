import React from 'react';
import { User, Scale, Zap, Info, X, CheckCircle, Edit } from 'lucide-react';

interface UserEditModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserEditModal = ({ isOpen, onClose }: UserEditModalProps) => {
    if (!isOpen) return null;

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
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-800 uppercase flex items-center gap-2">
                        <Edit className="w-5 h-5 text-primary" />
                        Chỉnh sửa người dùng
                    </h2>
                    <button 
                        className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
                        onClick={onClose}
                        title="Đóng"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Scrollable Form Body */}
                <form className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-surface/30">
                    {/* Section 1: Personal Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-2">
                            <User className="w-5 h-5" />
                            <h3 className="font-label-md uppercase tracking-wider text-xs">Thông tin cá nhân</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Tên</label>
                                <input className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" placeholder="Nhập tên" type="text" defaultValue="Jane" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Họ</label>
                                <input className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" placeholder="Nhập họ" type="text" defaultValue="Doe" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Giới tính</label>
                                <select className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md appearance-none" defaultValue="female">
                                    <option value="female">Nữ</option>
                                    <option value="male">Nam</option>
                                    <option value="non-binary">Khác</option>
                                    <option value="other">Không muốn tiết lộ</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Ngày sinh</label>
                                <input className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" type="date" defaultValue="1992-05-14" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Health Metrics */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-2">
                            <Scale className="w-5 h-5" />
                            <h3 className="font-label-md uppercase tracking-wider text-xs">Chỉ số sức khỏe</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Chiều cao (cm)</label>
                                <input className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" type="number" defaultValue="172" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Cân nặng (kg)</label>
                                <input className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" type="number" defaultValue="64.5" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Cân nặng mục tiêu (kg)</label>
                                <input className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md" type="number" defaultValue="62.0" />
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
                                <select className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md appearance-none" defaultValue="moderate">
                                    <option value="sedentary">Ít vận động</option>
                                    <option value="moderate">Vận động vừa phải</option>
                                    <option value="active">Năng động</option>
                                    <option value="very-active">Rất năng động</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Mục tiêu chính</label>
                                <select className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md appearance-none" defaultValue="muscle">
                                    <option value="loss">Giảm cân</option>
                                    <option value="muscle">Tăng cơ</option>
                                    <option value="maintenance">Duy trì</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Lượng calo mục tiêu (kcal/ngày)</label>
                                <div className="relative">
                                    <input className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md pr-16" type="number" defaultValue="2400" />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary text-sm">kcal</span>
                                </div>
                                <p className="text-xs text-secondary mt-1 flex items-center gap-1.5">
                                    <Info className="w-4 h-4" />
                                    Đề xuất dựa trên tính toán TDEE là 2,350 kcal.
                                </p>
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
                    >
                        Hủy
                    </button>
                    <button 
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-medium text-on-primary bg-primary hover:bg-primary/90 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                        onClick={onClose}
                        type="button"
                    >
                        <CheckCircle className="w-4 h-4" />
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserEditModal;
