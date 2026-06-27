import { axiosClient } from "../../../../api/axios.config";
import type { UpdateFoodRequest } from "../models/UpdateFood.model";

export const updateFoodService = async (foodId: number, data: UpdateFoodRequest) => {
    try{
        const res = await axiosClient.put(`/api/admin/foods/${foodId}`, data);
        if(res.status === 200){
            return res.data;
        }
    }catch(error :any){
        console.log("ERROR", error);
        console.log("STATUS", error?.response?.status);
        console.log("DATA", error?.response?.data);
    }
};