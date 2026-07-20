import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { JwtPayload } from "../utils/jwt";
import { LogoutService } from "../services/auth/logout.service";

export type AuthUserProfile = {
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
};

export type AuthUser = Partial<JwtPayload> &
  Record<string, unknown> & {
    userId?: number;
    username?: string | null;
    email?: string | null;
    name?: string | null;
    fullName?: string | null;
    avatarUrl?: string | null;
    userProfile?: AuthUserProfile | null;
    role?: unknown;
    roles?: unknown[];
  };

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  isInitialized: boolean;
  needsOnboarding: boolean;
  login: (
    user: AuthUser,
    token: string,
    refreshToken: string | null,
    needsOnboarding?: boolean,
  ) => void;
  setAuth: (
    user: AuthUser,
    token: string,
    refreshToken: string | null,
  ) => void;
  setUser: (user: AuthUser) => void;
  hydrate: () => void;
  clearAuth: () => void;
  setNeedsOnboarding: (value: boolean) => void;
  logout: () => Promise<void>;
};

const normalizeRoles = (roles: unknown[]) => {
  return roles.map((role) => {
    if (!role || typeof role !== "object") {
      return role;
    }

    const roleObject = role as Record<string, unknown>;

    return {
      ...roleObject,
      role: roleObject.role ?? roleObject.role_code,
      role_code: roleObject.role ?? roleObject.role_code,
    };
  });
};

const normalizeUser = (user: AuthUser): AuthUser => {
  if (!("roles" in user) || !Array.isArray(user.roles)) {
    return user;
  }

  return {
    ...user,
    roles: normalizeRoles(user.roles),
  };
};

const clearAuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isInitialized: true,
  needsOnboarding: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isInitialized: false,
      needsOnboarding: false,

      login: (user, token, refreshToken, needsOnboarding = false) => {
        set({
          user: normalizeUser(user),
          token,
          refreshToken,
          needsOnboarding,
          isInitialized: true,
        });
      },

      setAuth: (user, token, refreshToken) => {
        set({
          user: normalizeUser(user),
          token,
          refreshToken,
          isInitialized: true,
        });
      },

      setUser: (user) => {
        set({ user: normalizeUser(user) });
      },

      hydrate: () => {
        set((state) => ({ ...state, isInitialized: true }));
      },

      clearAuth: () => {
        set(clearAuthState);
      },

      setNeedsOnboarding: (value) => {
        set({ needsOnboarding: value });
      },

      logout: async () => {
        const { token, refreshToken } = useAuthStore.getState();

        try {
          if (token || refreshToken) {
            await LogoutService({
              accessToken: token || "",
              refreshToken: refreshToken || "",
            });
          }
        } catch (error) {
          console.warn("Logout API failed, clearing local auth instead:", error);
        } finally {
          set(clearAuthState);
        }
      },
    }),
    {
      name: "account_cms",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        needsOnboarding: state.needsOnboarding,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isInitialized = true;
        }
      },
    },
  ),
);
