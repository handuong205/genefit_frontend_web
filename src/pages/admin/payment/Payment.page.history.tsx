import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaymentManagementPage = () => {
    return (
        <div className="w-full h-full flex flex-col justify-between bg-white overflow-hidden">
            {/* Header */}
            <div className="px-8 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:flex-nowrap sm:items-center justify-between gap-3 shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 uppercase">Quản Lý Giao Dịch</h2>
                </div>
            </div>

            {/* Layout Start */}
            <div className="flex flex-col flex-1 min-h-0 space-y-6 p-6 overflow-hidden">
                    {/* Filters & Search */}
                    <div className="shrink-0 bg-surface border border-outline-variant/40 rounded-2xl p-4 shadow-sm shadow-black/5 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex flex-col lg:flex-row gap-4 w-full items-end lg:items-center">
                            <div className="relative flex-1 min-w-[240px]">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
                                <input className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-transparent rounded-xl focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 text-body-md transition-all placeholder:text-on-surface-variant/70 outline-none" placeholder="Tìm kiếm giao dịch..." type="text" />
                            </div>
                            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                                <select className="px-4 py-2.5 bg-surface-container-low border-none rounded-xl font-label-md text-label-md text-on-surface-variant focus:ring-2 focus:ring-primary/10 cursor-pointer appearance-none pr-10 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%233d4a3d%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-[right_0.7rem_center] bg-no-repeat outline-none">
                                    <option>Tất cả trạng thái</option>
                                    <option>Thành công</option>
                                    <option>Đang xử lý</option>
                                    <option>Thất bại</option>
                                </select>
                                <div className="relative group">
                                    <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-label-md text-label-md hover:bg-surface-tint transition-all shadow-sm flex items-center gap-2 cursor-pointer outline-none">
                                        <span className="material-symbols-outlined text-[20px]">filter_list</span>Lọc
                                    </button>
                                    <div className="absolute right-0 mt-2 w-72 bg-surface border border-outline-variant/40 rounded-2xl p-4 shadow-xl shadow-black/10 z-50 hidden group-focus-within:block">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">Khoảng thời gian</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] text-on-surface-variant/70 block">Từ</span>
                                                        <input className="w-full bg-surface-container-low border-none rounded-lg text-sm p-2 focus:ring-1 focus:ring-primary/30 outline-none" type="date" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] text-on-surface-variant/70 block">Đến</span>
                                                        <input className="w-full bg-surface-container-low border-none rounded-lg text-sm p-2 focus:ring-1 focus:ring-primary/30 outline-none" type="date" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">Tìm theo ID / Email</label>
                                                <input className="w-full px-3 py-2 bg-surface-container-low border-none rounded-lg text-sm placeholder:text-on-surface-variant/70 outline-none" placeholder="Nhập ID hoặc Email..." type="text" />
                                            </div>
                                            <button className="w-full bg-primary text-white py-2 rounded-lg font-label-md text-label-md hover:bg-surface-tint transition-colors cursor-pointer outline-none">Áp dụng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="flex flex-col flex-1 min-h-0 bg-surface border border-outline-variant/40 rounded-2xl shadow-sm shadow-black/5 overflow-hidden">
                        <div className="flex-1 overflow-auto scrollbar-hide">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface border-b border-outline-variant/40">
                                        <th className="px-6 py-5 font-label-md text-[13px] uppercase tracking-wider text-on-surface-variant/80">Ngày</th>
                                        <th className="px-6 py-5 font-label-md text-[13px] uppercase tracking-wider text-on-surface-variant/80">Khách Hàng</th>
                                        <th className="px-6 py-5 font-label-md text-[13px] uppercase tracking-wider text-on-surface-variant/80">Dịch Vụ</th>
                                        <th className="px-6 py-5 font-label-md text-[13px] uppercase tracking-wider text-on-surface-variant/80 text-right">Số tiền</th>
                                        <th className="px-6 py-5 font-label-md text-[13px] uppercase tracking-wider text-on-surface-variant/80 text-center">Trạng thái</th>
                                        <th className="px-6 py-5 font-label-md text-[13px] uppercase tracking-wider text-on-surface-variant/80 text-center">Hành Động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/30">
                                    {/* Row 1 */}
                                    <tr className="hover:bg-surface-container-lowest transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="text-on-surface font-label-md mb-1">15/11/2023</div>
                                            <div className="text-on-surface-variant text-[12px] font-medium">ID: #GF-98210</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-on-surface font-medium">Nguyen Van A</div>
                                            <div className="text-on-surface-variant text-[12px]">nguyen.van.a@email.com</div>
                                        </td>
                                        <td className="px-6 py-5 text-on-surface">Gói Năm (Premium)</td>
                                        <td className="px-6 py-5 text-right font-bold text-on-surface">2.400.000đ</td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-green-100/50 text-green-700">Thành công</span>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 hover:bg-surface-container-low rounded-lg text-primary cursor-pointer" title="Xem chi tiết">
                                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                </button>
                                                <button className="p-2 hover:bg-surface-container-low rounded-lg text-on-surface-variant cursor-pointer" title="Thêm">
                                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Row 2 */}
                                    <tr className="hover:bg-surface-container-lowest transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="text-on-surface font-label-md mb-1">15/11/2022</div>
                                            <div className="text-on-surface-variant text-[12px] font-medium">ID: #GF-77412</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-on-surface font-medium">Tran Thi B</div>
                                            <div className="text-on-surface-variant text-[12px]">b.tran@email.com</div>
                                        </td>
                                        <td className="px-6 py-5 text-on-surface">Gói Năm (Premium)</td>
                                        <td className="px-6 py-5 text-right font-bold text-on-surface">2.400.000đ</td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-green-100/50 text-green-700">Thành công</span>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 hover:bg-surface-container-low rounded-lg text-primary cursor-pointer" title="Xem chi tiết">
                                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                </button>
                                                <button className="p-2 hover:bg-surface-container-low rounded-lg text-on-surface-variant cursor-pointer" title="Thêm">
                                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Row 3 (Pending Example) */}
                                    <tr className="hover:bg-surface-container-lowest transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="text-on-surface font-label-md mb-1">02/10/2023</div>
                                            <div className="text-on-surface-variant text-[12px] font-medium">ID: #GF-65123</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-on-surface font-medium">Le Van C</div>
                                            <div className="text-on-surface-variant text-[12px]">levanc@email.com</div>
                                        </td>
                                        <td className="px-6 py-5 text-on-surface">Thuê Coach (1 Tháng)</td>
                                        <td className="px-6 py-5 text-right font-bold text-on-surface">500.000đ</td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-amber-100/50 text-amber-700">Đang xử lý</span>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 hover:bg-surface-container-low rounded-lg text-primary cursor-pointer" title="Xem chi tiết">
                                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                </button>
                                                <button className="p-2 hover:bg-surface-container-low rounded-lg text-on-surface-variant cursor-pointer" title="Thêm">
                                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Row 4 (Failed Example) */}
                                    <tr className="hover:bg-surface-container-lowest transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="text-on-surface font-label-md mb-1">15/09/2023</div>
                                            <div className="text-on-surface-variant text-[12px] font-medium">ID: #GF-54129</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-on-surface font-medium">Pham Van D</div>
                                            <div className="text-on-surface-variant text-[12px]">d.pham@email.com</div>
                                        </td>
                                        <td className="px-6 py-5 text-on-surface">Gia hạn Gói Năm</td>
                                        <td className="px-6 py-5 text-right font-bold text-on-surface">200.000đ</td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-red-100/50 text-red-700">Thất bại</span>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 hover:bg-surface-container-low rounded-lg text-primary cursor-pointer" title="Xem chi tiết">
                                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                </button>
                                                <button className="p-2 hover:bg-surface-container-low rounded-lg text-on-surface-variant cursor-pointer" title="Thêm">
                                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>

            {/* Footer Pagination */}
            <div className="px-8 py-3 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <span>Hiển thị</span>
                        <select
                            title="Số mục mỗi trang"
                            className="border border-gray-200 rounded-lg px-2 py-1 bg-white cursor-pointer outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="10">10 / trang</option>
                            <option value="20">20 / trang</option>
                            <option value="50">50 / trang</option>
                            <option value="100">100 / trang</option>
                        </select>
                    </div>
                    <div className="text-gray-400">|</div>
                    <div>
                        Tổng số <span className="font-medium text-gray-900">24</span> kết quả
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        title="Trang trước"
                        disabled
                        className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                        <input
                            title="Trang hiện tại"
                            type="number"
                            min={1}
                            value={1}
                            className="w-12 text-center border border-gray-200 rounded-md py-1 outline-none focus:ring-2 focus:ring-primary/20"
                            readOnly
                        />
                        <span>/ 3</span>
                    </div>
                    <button
                        title="Trang tiếp theo"
                        className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentManagementPage;
