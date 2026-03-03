import type { z } from "zod";
import { type CompanyFormSchema } from "./schema";

export type CompanyFormValues = z.infer<typeof CompanyFormSchema>;
