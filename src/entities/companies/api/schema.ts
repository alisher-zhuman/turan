import { z } from "zod";

const CompanyApiKeySchema = z
  .object({
    key: z.string(),
  })
  .passthrough();

export const CompanySchema = z
  .object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    key: CompanyApiKeySchema.nullable().optional(),
    createdAt: z.string(),
    isArchived: z.boolean(),
  })
  .passthrough();

export const CompaniesResponseSchema = z.array(CompanySchema);
