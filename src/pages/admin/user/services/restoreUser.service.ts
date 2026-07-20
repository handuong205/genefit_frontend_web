import { httpClient } from "../../../../api/httpClient.api";

export const restoreUserService = async (userId: number): Promise<string | null> => {
  try {
    const response = await httpClient.put<string, any>({
      url: `/api/admin/users/${userId}/restore`,
      data: {},
    });
    return response;
  } catch (error) {
    console.error("Error restoring user:", error);
    throw error;
  }
};
