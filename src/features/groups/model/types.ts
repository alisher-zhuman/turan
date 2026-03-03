import type { z } from "zod";

import { type GroupFormSchema } from "./schema";

export type GroupFormValues = z.infer<typeof GroupFormSchema>;
