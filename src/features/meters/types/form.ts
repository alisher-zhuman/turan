import type { z } from "zod";

import { type MeterFormSchema } from "../schemas";

export type MeterFormValues = z.infer<typeof MeterFormSchema>;
