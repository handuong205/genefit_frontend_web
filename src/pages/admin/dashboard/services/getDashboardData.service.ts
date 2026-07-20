import { httpClient } from "../../../../api/httpClient.api";
import type { DashboardResponse } from "../models/Dashboard.model";

export const getDashboardDataService = async (): Promise<DashboardResponse | null> => {
  try {
    const response = await httpClient.get<DashboardResponse, any>({
      url: `/api/admin/dashboard`,
    });
    return response;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
