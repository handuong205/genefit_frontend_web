import { axiosClient } from "../../../../api/axios.config";
import type { UpdatePlanRequest } from "../models/updateSubscription.model";

export const createPlanService = async (body: UpdatePlanRequest) => {
    try{
        const res = await axiosClient.post(`/api/subscriptions/plans`, body);
        if(res.status === 200 || res.status === 201){
            return res.data;
        }
    }catch(error :any){
        console.log("ERROR", error);
        console.log("STATUS", error?.response?.status);
        console.log("DATA", error?.response?.data);
    }
};
