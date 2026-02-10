import type { z } from "zod";
import type { Role } from "@/shared/types";
import { UsersResponseSchema } from "./schemas";

export type UsersResponse = z.infer<typeof UsersResponseSchema>;

export type UserRow = UsersResponse["data"][number];

export interface CreateUserPayload {
  email?: string;
  firstName: string;
  lastName: string;
  role: Role;
  companyId?: number;
}
