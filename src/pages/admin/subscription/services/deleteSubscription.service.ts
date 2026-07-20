import { axiosClient } from "../../../../api/axios.config";

export const deletePlanService = async (planId: number) => {
<<<<<<< HEAD
  const res = await axiosClient.delete(`/api/subscriptions/plans/${planId}`);

  return res.data;
=======
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
>>>>>>> ff0f214d526815f57d72256dd708390eb6513115
};
