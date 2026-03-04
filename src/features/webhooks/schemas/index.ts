import { z } from "zod";

export const WebhookFormSchema = z.object({
  url: z.string().trim().min(1, "Введите URL вебхука"),
});
