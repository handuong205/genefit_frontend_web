import { httpClient } from "../../../../api/httpClient.api";

export const deleteUserService = async (userId: number): Promise<string | null> => {
  try {
    const response = await httpClient.delete<string, any>({
      url: `/api/users/${userId}`,
    });
    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};
