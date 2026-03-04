import type { z } from "zod";

import { type ForgotFormSchema, type SignInFormSchema } from "../schemas";

export type SignInFormValues = z.infer<typeof SignInFormSchema>;

export type ForgotFormValues = z.infer<typeof ForgotFormSchema>;
