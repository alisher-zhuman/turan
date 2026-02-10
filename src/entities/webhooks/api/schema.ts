import { z } from "zod";

export const WebhookSchema = z
  .object({
    id: z.number(),
    url: z.string(),
    createdAt: z.string(),
  })
  .passthrough();

export const WebhooksResponseSchema = z.array(WebhookSchema);
