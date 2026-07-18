import { httpClient } from "../../../../api/httpClient.api";
import type { User } from "../models/User.model";

export const getUsersService = async (): Promise<User[]> => {
  const response = await httpClient.get<User[], Record<string, never>>({
    url: "/api/users",
  });

  return response ?? [];
};

export const searchUsersService = async (keyword: string): Promise<User[]> => {
  const response = await httpClient.get<User[], { keyword: string }>({
    url: "/api/users/search",
    params: { keyword },
  });

  return response ?? [];
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  try {
    const response = await httpClient.get<User, any>({
      url: `/api/users/${id}`,
    });
    return response;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    return null;
  }
};
