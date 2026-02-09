import type { Role, User } from "@/shared/types";

export interface GetUsersResponse {
  data: Omit<User, "devices">;
  total: number;
  page: number;
  limit: number;
}

export interface CreateUserPayload {
  email?: string;
  firstName: string;
  lastName: string;
  role: Role;
  companyId?: number;
}
