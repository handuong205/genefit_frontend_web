import { axiosClient } from "../../../../api/axios.config";
import type { GetPlansResponse } from "../models/searchSubscription.model";


export type SearchPlansRequest = {
  keyword?: string;
  pageInfo?: {
    pageNum?: number;
    pageSize?: number;
  };
};

<<<<<<< HEAD
export const searchPlanService = async (body: SearchPlansRequest): Promise<GetPlansResponse> => {
  const res = await axiosClient.get<GetPlansResponse>(`/api/subscriptions/plans`, {
    params: {
      pageNum: body.pageInfo?.pageNum ?? 1,
      pageSize: body.pageInfo?.pageSize ?? 10,
    },
  });

  return res.data;
};
=======
export const searchPlanService = async (body: SearchPlansRequest) => {
    try {
        const res = await axiosClient.get(`/api/subscriptions/plans`, {
            params: {
                pageNum: body.pageInfo?.pageNum || 1,
                pageSize: body.pageInfo?.pageSize || 10
            }
        });
        if (res.status === 200) {
            const apiRes = res.data;
            return {
                content: apiRes.data,
                pageInfo: {
                    pageNum: apiRes.pagination?.pageNum,
                    pageSize: apiRes.pagination?.pageSize,
                    totalItem: apiRes.pagination?.totalItems
                }
            };
        }
    }catch(error :any){
        console.log("ERROR", error);
        console.log("STATUS", error?.response?.status);
        console.log("DATA", error?.response?.data);
    }
};
>>>>>>> ff0f214d526815f57d72256dd708390eb6513115
