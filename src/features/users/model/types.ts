import type { z } from "zod";
import { type createUserFormSchema } from "./schema";

export type UserFormValues = z.infer<ReturnType<typeof createUserFormSchema>>;
