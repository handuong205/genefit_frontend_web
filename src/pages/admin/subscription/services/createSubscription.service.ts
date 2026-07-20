import { axiosClient } from "../../../../api/axios.config";
import type { UpdatePlanRequest } from "../models/updateSubscription.model";
import type { SubscriptionPlan } from "../models/searchSubscription.model";

interface ApiDataResponse<T> {
  data: T;
}

export const createPlanService = async (body: UpdatePlanRequest): Promise<SubscriptionPlan> => {
  const res = await axiosClient.post<ApiDataResponse<SubscriptionPlan>>(
    `/api/subscriptions/plans`,
    body,
  );

  return res.data.data;
};
