import { axiosClient } from "../../../../api/axios.config";

export const deletePlanService = async (planId: number) => {
  const res = await axiosClient.delete(`/api/subscriptions/plans/${planId}`);

  return res.data;
};
