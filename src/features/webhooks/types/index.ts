import type { z } from "zod";

import { type WebhookFormSchema } from "../schemas";

export type WebhookFormValues = z.infer<typeof WebhookFormSchema>;
