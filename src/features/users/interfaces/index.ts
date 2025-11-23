import type { User } from "@/features/authentication/interfaces/auth";

export interface GetUsersResponse {
  data: Omit<User, "company" | "devices">[];
  total: number;
  page: number;
  limit: number;
}
