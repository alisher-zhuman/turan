import type { z } from "zod";
import { type WebhookFormSchema } from "./schema";

export type WebhookFormValues = z.infer<typeof WebhookFormSchema>;
