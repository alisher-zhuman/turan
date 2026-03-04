import type { z } from "zod";

import { type CompanyFormSchema } from "../schemas";

export type CompanyFormValues = z.infer<typeof CompanyFormSchema>;
