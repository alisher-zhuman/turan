import type { z } from "zod";

import { type GroupFormSchema } from "../schemas";

export type GroupFormValues = z.infer<typeof GroupFormSchema>;
export type { GroupsSearchState } from "./search-params";
