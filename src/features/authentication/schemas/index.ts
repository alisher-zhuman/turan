import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z.string().min(1, "Введите логин"),
  password: z.string().min(1, "Введите пароль"),
});

export const ForgotFormSchema = z.object({
  email: z.string().min(1, "Введите email"),
});
