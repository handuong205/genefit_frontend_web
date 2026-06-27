import { axiosClient } from "../../../../api/axios.config";

export const deleteFoodService = async (foodId: number) => {
    try{
        const response = await axiosClient.delete(`/api/admin/foods/${foodId}`);
        return response;
    } catch (error) {
        console.error("Lỗi khi xóa món ăn:", error);
        throw error;
    }
}