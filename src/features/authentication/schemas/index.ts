import { z } from "zod";

export const LogInFormSchema = z.object({
  email: z.string().min(1, "Введите логин"),
  password: z.string().min(1, "Введите пароль"),
});

export const ForgotPasswordFormSchema = z.object({
  email: z.string().min(1, "Введите email"),
});
