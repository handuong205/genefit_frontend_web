import { httpClient } from "../../../../api/httpClient.api";

export type CurrentUserProfile = {
  firstName?: string | null;
  lastName?: string | null;
  dateOfBirth?: string | null;
  occupation?: string | null;
  heightCm?: number | null;
  weightKg?: number | null;
  age?: number | null;
  gender?: string | null;
  goal?: string | null;
  activityLevel?: string | null;
  targetWeightKg?: number | null;
  baseTargetCalorie?: number | null;
  initialWeight?: number | null;
  goalStartDate?: string | null;
  targetDate?: string | null;
  medicalConditions?: string[] | null;
  allergies?: string[] | null;
  avatarUrl?: string | null;
};

export type CurrentUser = {
  userId?: number;
  username?: string | null;
  email?: string | null;
  fullName?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  role?: unknown;
  userProfile?: CurrentUserProfile | null;
};

export const GetCurrentUserService = async (
  accessToken: string,
): Promise<CurrentUser | null> => {
  return httpClient.get<CurrentUser, Record<string, never>>({
    url: "/api/users/me",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
