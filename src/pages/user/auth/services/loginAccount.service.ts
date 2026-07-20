import { axiosClient } from "../../../../api/axios.config";

export type LoginAccountResponse = {
  success: boolean;
  message?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    authenticated?: boolean;
  };
};

export const LoginAccountService = async (
  username: string,
  password: string,
): Promise<LoginAccountResponse> => {
  const response = await axiosClient.post<LoginAccountResponse>("/api/auth/login", {
    username,
    password,
  });

  return response.data;
};
