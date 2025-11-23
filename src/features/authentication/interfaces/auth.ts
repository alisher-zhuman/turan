import type { Company } from "@/features/companies/interfaces/companies";
import type { Role } from "@/shared/types";

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
  role: Role;
  company: Omit<Company, "users" | "key"> | null;
  devices: Device[] | [];
  passwordChange: boolean;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}
