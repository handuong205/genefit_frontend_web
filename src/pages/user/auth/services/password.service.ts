import { axiosClient } from "../../../../api/axios.config";

export const ForgotPasswordOtpService = async (email: string) => {
  const response = await axiosClient.post("/api/users/forgot-password/send-otp", null, {
    params: { email },
  });

  return response.data;
};

export const ResetPasswordService = async ({
  email,
  newPassword,
  otpCode,
}: {
  email: string;
  newPassword: string;
  otpCode: string;
}) => {
  const response = await axiosClient.post("/api/users/reset-password", {
    email,
    otpCode,
    newPassword,
  });

  return response.data;
};

export const ChangePasswordService = async ({
  newPassword,
  oldPassword,
}: {
  newPassword: string;
  oldPassword: string;
}) => {
  const response = await axiosClient.put("/api/users/me/password", {
    oldPassword,
    newPassword,
  });

  return response.data;
};
