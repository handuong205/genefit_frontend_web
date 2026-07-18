import { axiosClient } from "../../../../api/axios.config";
import type { GetPlansResponse } from "../models/searchSubscription.model";


export type SearchPlansRequest = {
  keyword?: string;
  pageInfo?: {
    pageNum?: number;
    pageSize?: number;
  };
};

export const searchPlanService = async (body: SearchPlansRequest): Promise<GetPlansResponse> => {
  const res = await axiosClient.get<GetPlansResponse>(`/api/subscriptions/plans`, {
    params: {
      pageNum: body.pageInfo?.pageNum ?? 1,
      pageSize: body.pageInfo?.pageSize ?? 10,
    },
  });

  return res.data;
};
