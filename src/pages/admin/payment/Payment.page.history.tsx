import { useState, useEffect } from 'react';
import { CRUDPageTemplate, type Column } from "../../../components/template/CRUDTemplate";
import { getPaymentHistoryService, type PaymentHistoryDto } from './services/getPaymentHistory.service';
import { toast } from 'react-toastify';

const columns: Column<PaymentHistoryDto>[] = [
    {
        header: 'Ngày',
        accessor: 'createdAt',
        sortable: true,
        render: (item) => {
            return (
                <div>
                    <div className="text-on-surface font-label-md mb-1">{item.createdAt ? new Date(item.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</div>
                    <div className="text-on-surface-variant text-[12px] font-medium">Mã: {item.orderCode}</div>
                </div>
            );
        }
    },
    {
        header: 'Khách Hàng',
        accessor: 'orderCode', // Temporary since backend doesn't return user details for this API yet
        sortable: false,
        render: () => {
            return (
                <div>
                    <div className="text-on-surface font-medium italic text-on-surface-variant/70">Dữ liệu cá nhân</div>
                    <div className="text-on-surface-variant text-[12px] italic">Không hiển thị từ API</div>
                </div>
            );
        }
    },
    {
        header: 'Dịch Vụ',
        accessor: 'planName',
        sortable: true,
        render: (item) => {
            return (
                <div>
                    <div className="text-on-surface">{item.planName}</div>
                    <div className="text-[11px] text-primary font-medium uppercase tracking-wider">{item.paymentMethod}</div>
                </div>
            );
        }
    },
    {
        header: 'Số tiền',
        accessor: 'amount',
        sortable: true,
        className: 'text-right',
        render: (item) => {
            return (
                <div className="font-bold text-on-surface">
                    {item.amount?.toLocaleString('vi-VN')}đ
                </div>
            );
        }
    },
    {
        header: 'Trạng thái',
        accessor: 'status',
        sortable: true,
        className: 'text-center',
        render: (item) => {
            let bgColor = "bg-gray-100";
            let textColor = "text-gray-700";
            let label = item.status;

            const statusUpper = item.status ? String(item.status).toUpperCase() : "";

            if (statusUpper === 'SUCCESS' || statusUpper === 'COMPLETED') {
                bgColor = "bg-green-100";
                textColor = "text-green-700";
                label = "Thành công";
            } else if (statusUpper === 'PENDING') {
                bgColor = "bg-amber-100";
                textColor = "text-amber-700";
                label = "Đang xử lý";
            } else if (statusUpper === 'FAILED' || statusUpper === 'CANCELLED') {
                bgColor = "bg-red-100";
                textColor = "text-red-700";
                label = "Thất bại";
            }

            return (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold ${bgColor} ${textColor}`}>
                    {label}
                </span>
            );
        }
    }
];

const PaymentManagementPage = () => {
    const [transactions, setTransactions] = useState<PaymentHistoryDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [originalData, setOriginalData] = useState<PaymentHistoryDto[]>([]);

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            // Note: Currently fetches the first page of history for the logged-in user
            const response = await getPaymentHistoryService();
            if (response && response.transactions) {
                setTransactions(response.transactions);
                setOriginalData(response.transactions);
            } else {
                setTransactions([]);
                setOriginalData([]);
            }
        } catch (error) {
            console.error("Lỗi khi tải lịch sử giao dịch:", error);
            toast.error("Không thể tải lịch sử giao dịch");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleSearch = async (searchTerm?: string, filters?: any) => {
        setIsLoading(true);
        
        let filtered = [...originalData];
        
        if (searchTerm) {
            const keyword = searchTerm.toLowerCase();
            filtered = filtered.filter(t => 
                (t.orderCode && t.orderCode.toLowerCase().includes(keyword)) || 
                (t.planName && t.planName.toLowerCase().includes(keyword))
            );
        }
        if (filters?.status) {
            filtered = filtered.filter(t => {
                const statusUpper = t.status ? String(t.status).toUpperCase() : "";
                if (filters.status === "SUCCESS") return statusUpper === "SUCCESS" || statusUpper === "COMPLETED";
                if (filters.status === "PENDING") return statusUpper === "PENDING";
                if (filters.status === "FAILED") return statusUpper === "FAILED" || statusUpper === "CANCELLED";
                return true;
            });
        }
        
        setTransactions(filtered);
        setIsLoading(false);
    };

    return (
        <CRUDPageTemplate<PaymentHistoryDto>
            title="Quản Lý Giao Dịch"
            columns={columns}
            data={transactions}
            rowKey="transactionId"
            isTableLoading={isLoading}
            onSearch={handleSearch}
            onView={(item) => console.log('View', item)}
            onDelete={(item) => console.log('Delete', item)}
            onRefresh={fetchTransactions}
            filters={[
                {
                    key: "status",
                    label: "Trạng thái",
                    options: [
                        { value: "SUCCESS", label: "Thành công" },
                        { value: "PENDING", label: "Đang xử lý" },
                        { value: "FAILED", label: "Thất bại" }
                    ]
                }
            ]}
        />
    );
};

export default PaymentManagementPage;
