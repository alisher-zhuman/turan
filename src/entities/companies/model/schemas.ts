import { z } from "zod";

const CompanyApiKeySchema = z
  .object({
    key: z.string(),
    createdAt: z.string(),
  })
  .passthrough();

const CompanySchema = z
  .object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    key: CompanyApiKeySchema.nullable(),
    createdAt: z.string(),
    isArchived: z.boolean(),
  })
  .passthrough();

export const CompaniesResponseSchema = z.array(CompanySchema);
