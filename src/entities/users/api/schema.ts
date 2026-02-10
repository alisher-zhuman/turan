import { z } from "zod";

const UserCompanySchema = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .passthrough();

export const UserRowSchema = z
  .object({
    id: z.number(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.string(),
    company: UserCompanySchema.nullable().optional(),
    createdAt: z.string(),
    isArchived: z.boolean(),
  })
  .passthrough();

export const UsersResponseSchema = z
  .object({
    data: z.array(UserRowSchema),
    total: z.number(),
  })
  .passthrough();
