import { axiosClient } from "../../../api/axios.config";
import type { CurrentUserProfile } from "../../user/auth/services/getCurrentUser.service";

export type Gender = "MALE" | "FEMALE" | "OTHER";
export type GoalType = "LOSE_WEIGHT" | "GAIN_WEIGHT" | "MAINTAIN";
export type ActivityLevel =
  | "SEDENTARY"
  | "LIGHTLY_ACTIVE"
  | "MODERATELY_ACTIVE"
  | "VERY_ACTIVE";

export type UpdateUserProfileRequest = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  occupation?: string;
  heightCm: number;
  weightKg: number;
  age: number;
  gender: Gender;
  goal: GoalType;
  activityLevel: ActivityLevel;
  targetWeightKg?: number;
  targetDate?: string;
  medicalConditions?: string[];
  allergies?: string[];
};

export const updateUserProfile = async ({
  accessToken,
  body,
}: {
  accessToken: string;
  body: UpdateUserProfileRequest;
}): Promise<CurrentUserProfile | null> => {
  const response = await axiosClient.put<{ data?: CurrentUserProfile | null }>(
    "/api/users/me/profile",
    body,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data.data ?? null;
};

export const updateUserAvatar = async ({
  accessToken,
  avatarUrl,
}: {
  accessToken: string;
  avatarUrl: string;
}): Promise<string> => {
  const response = await axiosClient.put<{ data?: string }>(
    "/api/users/me/avatar",
    { avatarUrl },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data.data ?? avatarUrl;
};
