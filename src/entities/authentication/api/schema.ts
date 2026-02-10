import { z } from "zod";

const AuthCompanySchema = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .passthrough();

export const SignInResponseSchema = z
  .object({
    accessToken: z.string(),
    id: z.number(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.string(),
    passwordChange: z.boolean().default(false),
    company: AuthCompanySchema.nullable().optional(),
  })
  .passthrough();
