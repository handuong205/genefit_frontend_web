import { axiosClient } from "../../../../api/axios.config";
import type { CreateFoodRequest } from "../models/CreateFood.model";

export const createFoodService = async (data: CreateFoodRequest) => {
    try{
        const res = await axiosClient.post('/api/admin/foods', data);
        if(res.status === 200){
            return res.data;
        }
    }catch(error :any){
        console.log("ERROR", error);
        console.log("STATUS", error?.response?.status);
        console.log("DATA", error?.response?.data);
    }
};