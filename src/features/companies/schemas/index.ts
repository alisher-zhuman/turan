import { z } from "zod";

export const CompanyFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Название должно быть не менее 3 символов"),
  address: z.string().trim().min(1, "Адрес обязателен"),
});
