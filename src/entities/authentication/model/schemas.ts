import { z } from "zod";

import { IdNameSchema, RoleSchema } from "@/shared/validation";

export const LogInResponseSchema = z
  .object({
    accessToken: z.string(),
    id: z.number(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: RoleSchema,
    passwordChange: z.boolean(),
    company: IdNameSchema.nullable(),
  })
  .passthrough();
