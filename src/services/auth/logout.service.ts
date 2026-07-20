import axios from "axios";
import { ENV } from "../../config";

type LogoutBody = {
  accessToken: string;
  refreshToken: string;
};

export const LogoutService = async (body: LogoutBody) => {
  const response = await axios.post(`${ENV.API_URL}/api/auth/logout`, body, {
    timeout: 300000,
    withCredentials: false,
  });

  return response.data;
};
