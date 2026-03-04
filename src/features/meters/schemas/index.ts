import { z } from "zod";

export const MeterFormSchema = z.object({
  customerID: z.string().optional(),
  client: z.string().optional(),
  address: z.string().optional(),
  descriptions: z.string().optional(),
  isArchived: z.boolean(),
});
