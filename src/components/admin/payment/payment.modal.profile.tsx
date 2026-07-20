import React from 'react';
import { X, Info, User as UserIcon, Dumbbell, History, Printer, BrainCircuit } from 'lucide-react';
import type { PaymentHistoryDto } from '../../../pages/admin/payment/services/getPaymentHistory.service';

interface PaymentProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: PaymentHistoryDto | null;
}

const PaymentProfileModal: React.FC<PaymentProfileModalProps> = ({ isOpen, onClose, transaction }) => {
    if (!isOpen || !transaction) return null;

    // Formatting helpers
    const formatCurrency = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN') + ', ' + date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    };

    // Status mapping
    const statusUpper = transaction.status ? String(transaction.status).toUpperCase() : "";
    let statusLabel = statusUpper;
    let statusBg = "bg-gray-100";
    let statusText = "text-gray-700";
    let statusDot = "bg-gray-500";

    if (statusUpper === 'SUCCESS' || statusUpper === 'COMPLETED') {
        statusLabel = "Thành công";
        statusBg = "bg-primary-container/20 border-primary-container/30";
        statusText = "text-on-primary-container";
        statusDot = "bg-primary-container";
    } else if (statusUpper === 'PENDING') {
        statusLabel = "Đang xử lý";
        statusBg = "bg-amber-100/50 border-amber-200";
        statusText = "text-amber-700";
        statusDot = "bg-amber-500";
    } else if (statusUpper === 'FAILED' || statusUpper === 'CANCELLED') {
        statusLabel = "Thất bại";
        statusBg = "bg-red-100/50 border-red-200";
        statusText = "text-red-700";
        statusDot = "bg-red-500";
    }

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-on-background/40 backdrop-blur-sm" id="transaction-modal" onClick={onClose}>
            {/* Modal Content Container */}
            <div
                className="bg-surface-container-lowest w-full max-w-2xl max-h-[95vh] rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
                    <div className="flex flex-col">
                        <h2 className="font-headline-md text-headline-md text-on-surface">Chi tiết Giao dịch</h2>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Mã giao dịch: <span className="text-primary font-bold">#{transaction.orderCode}</span></span>
                    </div>
                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant active:scale-95"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-surface-bright">
                    {/* Status & High-Level Summary */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 border ${statusBg} ${statusText}`}>
                                <span className={`w-2 h-2 rounded-full ${statusDot}`}></span>
                                <span className="font-label-md text-label-md">{statusLabel}</span>
                            </div>
                            <div className="text-on-surface-variant text-label-sm">
                                Cập nhật lúc {formatDate(transaction.updatedAt || transaction.createdAt)}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-label-sm text-on-surface-variant uppercase tracking-wider">Tổng cộng</div>
                            <div className="text-[28px] font-bold text-primary leading-tight">{formatCurrency(transaction.amount)}</div>
                        </div>
                    </div>

                    {/* Main Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column: Info Sections */}
                        <div className="space-y-8">
                            {/* Overview Section */}
                            <section>
                                <h3 className="font-label-md text-label-md text-on-surface-variant border-b border-outline-variant pb-2 mb-4 flex items-center gap-2">
                                    <Info className="w-5 h-5" />
                                    Tổng quan
                               </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-on-surface-variant text-body-md">Ngày & Giờ</span>
                                        <span className="text-on-surface font-medium text-body-md">{formatDate(transaction.createdAt)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-on-surface-variant text-body-md">Phương thức</span>
                                        <div className="flex items-center gap-2">
                                            {transaction.paymentMethod === 'MOMO' ? (
                                                <div className="w-6 h-6 bg-[#A50064] rounded flex items-center justify-center text-[10px] text-white font-bold">Mo</div>
                                            ) : transaction.paymentMethod === 'VNPAY' ? (
                                                <div className="w-6 h-6 bg-[#005BAC] rounded flex items-center justify-center text-[8px] text-white font-bold leading-none">VN<br/>PAY</div>
                                            ) : (
                                                <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center text-[10px] text-white font-bold">$$</div>
                                            )}
                                            <span className="text-on-surface font-medium text-body-md">
                                                {transaction.paymentMethod === 'MOMO' ? 'Ví MoMo' : transaction.paymentMethod === 'VNPAY' ? 'VNPAY' : transaction.paymentMethod}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-on-surface-variant text-body-md">Loại hình</span>
                                        <span className="text-on-surface font-medium text-body-md">Đăng ký mới</span>
                                    </div>
                                </div>
                            </section>

                            {/* Customer Info Section */}
                            <section>
                                <h3 className="font-label-md text-label-md text-on-surface-variant border-b border-outline-variant pb-2 mb-4 flex items-center gap-2">
                                    <UserIcon className="w-5 h-5" />
                                    Thông tin Khách hàng
                                </h3>
                                <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg">
                                            {transaction.avatarUrl ? (
                                                <img className="w-full h-full object-cover" src={transaction.avatarUrl} alt="Avatar" />
                                            ) : (
                                                transaction.username?.substring(0, 2).toUpperCase() || 'U'
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-on-surface font-semibold text-body-md">{transaction.username || 'Không xác định'}</div>
                                            <div className="text-on-surface-variant text-label-sm">#USR-{transaction.userId}</div>
                                        </div>
                                    </div>
                                    <div className="text-on-surface-variant text-body-md break-all flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">mail</span>
                                        {transaction.email || 'Không có email'}
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Service & Timeline */}
                        <div className="space-y-8">
                            {/* Service Details */}
                            <section>
                                <h3 className="font-label-md text-label-md text-on-surface-variant border-b border-outline-variant pb-2 mb-4 flex items-center gap-2">
                                    <Dumbbell className="w-5 h-5" />
                                    Chi tiết Dịch vụ
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-on-surface font-bold text-body-lg">{transaction.planName}</div>
                                            <div className="text-on-surface-variant text-label-sm">Dịch vụ Subscription</div>
                                        </div>
                                        <div className="w-10 h-10 bg-primary-container/10 rounded-lg flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">workspace_premium</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-surface-container-high rounded text-label-sm text-on-secondary-container">AI Nutrition Plan</span>
                                        <span className="px-2 py-1 bg-surface-container-high rounded text-label-sm text-on-secondary-container">24/7 AI Chat</span>
                                        <span className="px-2 py-1 bg-surface-container-high rounded text-label-sm text-on-secondary-container">Gym Map Access</span>
                                    </div>
                                </div>
                            </section>

                            {/* Activity Log / Timeline */}
                            <section>
                                <h3 className="font-label-md text-label-md text-on-surface-variant border-b border-outline-variant pb-2 mb-4 flex items-center gap-2">
                                    <History className="w-5 h-5" />
                                    Lịch sử Hoạt động
                                </h3>
                                <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant">
                                    {/* Timeline Item 1 */}
                                    <div className="relative">
                                        <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-white"></div>
                                        <div className="text-on-surface font-semibold text-label-md">Trạng thái hiện tại: {statusLabel}</div>
                                        <div className="text-on-surface-variant text-label-sm">{formatDate(transaction.updatedAt || transaction.createdAt)}</div>
                                    </div>
                                    {/* Timeline Item 3 */}
                                    <div className="relative">
                                        <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-primary/20 border-2 border-white"></div>
                                        <div className="text-on-surface-variant text-label-md">Khởi tạo giao dịch</div>
                                        <div className="text-on-surface-variant text-label-sm">{formatDate(transaction.createdAt)}</div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* AI Insights Decoration (Glassmorphism) */}
                    <div className="mt-10 p-4 bg-primary/5 backdrop-blur-sm rounded-lg border border-primary/20 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-label-md font-bold text-primary mb-1">AI Recommendation Insight</div>
                            <p className="text-on-surface-variant text-label-sm leading-relaxed">
                                {statusUpper === 'SUCCESS' 
                                    ? "Khách hàng này có xu hướng thanh toán đúng hạn và ưu tiên các gói dịch vụ cao cấp. Hệ thống đề xuất gửi ưu đãi gia hạn trước 1 tháng để tối ưu hóa tỷ lệ giữ chân." 
                                    : "Giao dịch không thành công hoặc đang xử lý. Hãy kiểm tra lại kết nối cổng thanh toán hoặc liên hệ khách hàng để hỗ trợ."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-outline-variant bg-surface-container flex flex-col sm:flex-row justify-end items-center gap-3">
                    <button 
                        onClick={handlePrint}
                        className="w-full sm:w-auto px-6 h-11 rounded-lg text-on-surface font-semibold flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors active:scale-95"
                    >
                        <Printer className="w-5 h-5" />
                        In hóa đơn
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full sm:w-auto px-10 h-11 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-on-primary-fixed-variant transition-all active:scale-95"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentProfileModal;
