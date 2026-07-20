import type { MockUser } from "../models/MockUser.model";

export const USERS: MockUser[] = [
  {
    id: 1,
    name: "Nguyen Van A",
    username: "admin",
    email: "nguyenvana@example.com",
    role: "ADMIN",
    token: "mock-token-123",
    refreshToken: "mock-refresh-token-123",
  },
  {
    id: 2,
    name: "Tran Thi B",
    username: "tranthib",
    email: "tranthib@example.com",
    role: "USER",
    token: "mock-token-456",
    refreshToken: "mock-refresh-token-456",
  },
  {
    id: 3,
    name: "Le Van C",
    username: "levanc",
    email: "levanc@example.com",
    role: "USER",
    token: "mock-token-789",
    refreshToken: "mock-refresh-token-789",
  },
  {
    id: 4,
    name: "Pham Thi D",
    username: "phamthid",
    email: "phamthid@example.com",
    role: "USER",
    token: "mock-token-012",
    refreshToken: "mock-refresh-token-012",
  },
];
