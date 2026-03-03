import type { z } from "zod";

import { type DevicesResponseSchema } from "./schemas";

export type DevicesResponse = z.infer<typeof DevicesResponseSchema>;
export type Device = DevicesResponse["data"][number];
