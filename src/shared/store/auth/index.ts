import { create } from "zustand";
import type { User } from "@/shared/interfaces/auth";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const storedToken = localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    accessToken: storedToken || null,

    setAuth: (user, token) => {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, accessToken: token });
    },

    logout: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      set({ user: null, accessToken: null });
    },
  };
});
