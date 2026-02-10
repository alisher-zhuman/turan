import { z } from "zod";
import { IdNameSchema, RoleSchema } from "@/shared/validation";

const UserRowSchema = z
  .object({
    id: z.number(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: RoleSchema,
    company: IdNameSchema.nullable(),
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
