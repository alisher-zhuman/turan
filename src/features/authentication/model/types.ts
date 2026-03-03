import type { z } from "zod";
import { type ForgotFormSchema, type SignInFormSchema } from "./schema";

export type SignInFormValues = z.infer<typeof SignInFormSchema>;

export type ForgotFormValues = z.infer<typeof ForgotFormSchema>;
