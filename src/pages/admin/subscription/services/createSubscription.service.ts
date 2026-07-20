import { axiosClient } from "../../../../api/axios.config";
import type { UpdatePlanRequest } from "../models/updateSubscription.model";
import type { SubscriptionPlan } from "../models/searchSubscription.model";

<<<<<<< HEAD
interface ApiDataResponse<T> {
  data: T;
}

export const createPlanService = async (body: UpdatePlanRequest): Promise<SubscriptionPlan> => {
  const res = await axiosClient.post<ApiDataResponse<SubscriptionPlan>>(
    `/api/subscriptions/plans`,
    body,
  );

  return res.data.data;
=======
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
>>>>>>> ff0f214d526815f57d72256dd708390eb6513115
};
