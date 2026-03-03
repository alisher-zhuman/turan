import type { z } from "zod";

import { type CompaniesResponseSchema } from "./schemas";

export type CompaniesResponse = z.infer<typeof CompaniesResponseSchema>;
export type Company = CompaniesResponse[number];

export interface CompanyPayload {
  name: string;
  address: string;
}
