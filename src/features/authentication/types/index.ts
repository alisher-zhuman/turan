import type { z } from "zod";

import { type ForgotPasswordFormSchema, type LogInFormSchema } from "../schemas";

export type LogInFormValues = z.infer<typeof LogInFormSchema>;

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordFormSchema>;
