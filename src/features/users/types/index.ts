import type { z } from "zod";

import { type createUserFormSchema } from "../schemas";

export type UserFormValues = z.infer<ReturnType<typeof createUserFormSchema>>;
