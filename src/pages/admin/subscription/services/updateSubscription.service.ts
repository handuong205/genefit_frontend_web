import { axiosClient } from "../../../../api/axios.config";
import type { SubscriptionPlan } from "../models/searchSubscription.model";
import type { UpdatePlanRequest } from "../models/updateSubscription.model";

interface ApiDataResponse<T> {
  data: T;
}

export const updatePlanService = async (
  planId: number,
  data: UpdatePlanRequest,
): Promise<SubscriptionPlan> => {
  const res = await axiosClient.put<ApiDataResponse<SubscriptionPlan>>(
    `/api/subscriptions/plans/${planId}`,
    data,
  );

  return res.data.data;
};
