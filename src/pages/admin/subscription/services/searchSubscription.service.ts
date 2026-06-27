import { axiosClient } from "../../../../api/axios.config";


export type SearchPlansRequest = {
    keyword?: string;
    pageInfo?: {
        pageNum?: number;
        pageSize?: number;
    }
}

export const searchPlanService = async (body: SearchPlansRequest) => {
    try{
        const res = await axiosClient.post(`/api/subscription-plans/get-all`, body);
        if(res.status === 200){
            return res.data;
        }
    }catch(error :any){
        console.log("ERROR", error);
        console.log("STATUS", error?.response?.status);
        console.log("DATA", error?.response?.data);
    }
};