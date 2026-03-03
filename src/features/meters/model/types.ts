import type { z } from "zod";
import { type MeterFormSchema } from "./schema";

export type MeterFormValues = z.infer<typeof MeterFormSchema>;
