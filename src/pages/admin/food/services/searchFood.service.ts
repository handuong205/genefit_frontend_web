import { axiosClient } from "../../../../api/axios.config";

export type SearchFoodRequest = {
  searchCondition?: {
    foodId?: number;
    keyword?: string;

    calories?: number;
    caloriesFrom?: number;
    caloriesTo?: number;

    proteinFrom?: number;
    proteinTo?: number;

    carbsFrom?: number;
    carbsTo?: number;

    fatFrom?: number;
    fatTo?: number;

    isPublic?: boolean | string;
    isDeleted?: boolean | string;
  };
  pageInfo?: {
    pageNum?: number;
    pageSize?: number;
  };
};

export const searchFoodService = async (body: SearchFoodRequest) => {
  try {
    const response = await axiosClient.post("/api/foods/search", body);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    console.log("ERROR", error);
    console.log("STATUS", error?.response?.status);
    console.log("DATA", error?.response?.data);
  }
};
