import { z } from "zod";

export const MeterFormSchema = z.object({
  meterId: z.string().trim().min(1, "Номер счётчика обязателен"),
  password: z.string().optional(),
  customerID: z.string().optional(),
  client: z.string().optional(),
  address: z.string().optional(),
  descriptions: z.string().optional(),
  isArchived: z.boolean(),
});
