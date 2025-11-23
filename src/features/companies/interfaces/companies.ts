import type { User } from "@/features/authentication/interfaces/auth";

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

export interface CompanyPayload {
  name: string;
  address: string;
}
