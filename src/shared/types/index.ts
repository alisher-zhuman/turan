import type { ReactNode } from "react";
import type { ROLE } from "../constants";

export type Role = (typeof ROLE)[keyof typeof ROLE];

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  company: { id: number; name: string } | null;
  passwordChange: boolean;
}

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

export interface SidebarLink {
  label: string;
  to: string;
  roles: Role[];
}

export interface Column<T> {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
}

export interface ApiErrorLike {
  response?: {
    data?: {
      message?: string | string[];
      error?: string;
      statusCode?: number;
    };
  };
  message?: string;
}
