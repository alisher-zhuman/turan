import type { ReactNode } from "react";
import type { ROLE } from "../constants";

export type Role = (typeof ROLE)[keyof typeof ROLE];

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  company: Omit<Company, "users" | "key"> | null;
  devices: Device[] | [];
  passwordChange: boolean;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
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

export interface Company {
  id: number;
  name: string;
  address: string;
  users: Omit<User, "company" | "devices">[];
  key: {
    key: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}

export interface Device {
  id: number;
  deviceId: string;
  verified: boolean;
  createdAt: string;
  isArchived: boolean;
  user?: Omit<User, "company" | "devices"> | null;
}

export interface Meter {
  id: number;
  name: string;
  password: string;
  customerID: string | null;
  client: string | null;
  address: string | null;
  descriptions: string | null;
  valveStatus: "open" | "closed";
  valveStatusChange: string | null;
  batteryStatus: string | null;
  lastReading: number | null;
  pendingCommand: string | null;
  status: "normal" | "warning" | "error";
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
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
