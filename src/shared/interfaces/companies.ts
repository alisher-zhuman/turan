import type { User } from "./auth";

export interface Company {
  id: number;
  name: string;
  address: string;
  users: Omit<User, "company" | "devices">[];
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}
