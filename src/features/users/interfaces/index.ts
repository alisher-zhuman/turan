import type { User } from "@/features/authentication/interfaces/auth";
import type { Role } from "@/shared/types";

export interface GetUsersResponse {
  data: Omit<User, "company" | "devices">[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateUserPayload {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  companyId?: number;
}
