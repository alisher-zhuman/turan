import type { z } from "zod";

import { type WebhooksResponseSchema } from "./schemas";

export type WebhooksResponse = z.infer<typeof WebhooksResponseSchema>;
export type Webhook = WebhooksResponse[number];
