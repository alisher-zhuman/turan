import { create } from "zustand";
import type {
  AuthSession,
  AuthState,
  User,
} from "@/features/authentication/interfaces/auth";
import { AUTH_STORAGE_KEY } from "../../utils/constants";

export const useAuthStore = create<AuthState>((set) => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);

  let user: User | null = null;
  let accessToken: string | null = null;

  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Partial<AuthSession>;
      user = (parsed.user as User) ?? null;
      accessToken = (parsed.accessToken as string) ?? null;
    } catch {
      // ignore
    }
  }

  return {
    user,
    accessToken,

    setAuth: (session) => {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      set({ user: session.user, accessToken: session.accessToken });
    },

    logout: () => {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      set({ user: null, accessToken: null });
    },
  };
});
