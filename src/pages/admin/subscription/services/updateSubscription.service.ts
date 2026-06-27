import { axiosClient } from "../../../../api/axios.config";
import type { UpdatePlanRequest } from "../models/updateSubscription.model";

export const updatePlanService = async (planId: number, data: UpdatePlanRequest) => {
    try{
        const res = await axiosClient.put(`/api/subscription-plans/${planId}`, data);
        if(res.status === 200){
            return res.data;
        }
    }catch(error :any){
        console.log("ERROR", error);
        console.log("STATUS", error?.response?.status);
        console.log("DATA", error?.response?.data);
    }
};