import { axiosClient } from "../../../../api/axios.config";

export const deletePlanService = async (planId: number) => {
    try{
        const res = await axiosClient.delete(`/api/subscriptions/plans/${planId}`);
        if(res.status === 200 || res.status === 204){
            return res.data;
        }
    }catch(error :any){
        console.log("ERROR", error);
        console.log("STATUS", error?.response?.status);
        console.log("DATA", error?.response?.data);
    }
};
