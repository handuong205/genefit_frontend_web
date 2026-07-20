import { httpClient } from "../../../../api/httpClient.api";

export interface PaymentHistoryDto {
    transactionId: number;
    orderCode: string;
    planName: string;
    amount: number;
    paymentMethod: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface PaymentHistoryResponse {
    transactions: PaymentHistoryDto[];
    nextCursor: number | null;
    hasMore: boolean;
}

export const getPaymentHistoryService = async (cursor?: number, pageSize: number = 50): Promise<PaymentHistoryResponse> => {
    try {
        let url = `/api/payment/history?pageSize=${pageSize}`;
        if (cursor) {
            url += `&cursor=${cursor}`;
        }

        const response = await httpClient.get<PaymentHistoryResponse, any>({
            url: url,
        });

        return response;
    } catch (error) {
        console.error("Error in getPaymentHistoryService:", error);
        throw error;
    }
};
