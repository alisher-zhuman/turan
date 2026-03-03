import type { z } from "zod";

import { type MetersResponseSchema } from "./schemas";

export type MetersResponse = z.infer<typeof MetersResponseSchema>;
export type Meter = MetersResponse["data"][number];
