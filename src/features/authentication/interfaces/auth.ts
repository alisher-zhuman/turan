import type { Company } from "@/features/companies/interfaces/companies";

export interface Device {
  id: number;
  deviceId: string;
  verified: boolean;
  createdAt: string;
  isArchived: boolean;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "super_admin" | "admin" | "user" | "controller";
  company: Omit<Company, "users" | "key"> | null;
  devices: Device[] | [];
  passwordChange: boolean;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}
