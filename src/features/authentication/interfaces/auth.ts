import type { User } from "@/shared/types";

export interface AuthSession {
  user: User;
  accessToken: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (session: AuthSession) => void;
  logout: () => void;
}
