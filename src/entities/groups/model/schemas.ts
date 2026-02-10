import { z } from "zod";

const GroupSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    createdAt: z.string(),
  })
  .passthrough();

export const GroupsResponseSchema = z
  .object({
    data: z.array(GroupSchema),
    total: z.number(),
  })
  .passthrough();

export const GroupActionResponseSchema = z
  .object({
    message: z.string().optional(),
  })
  .passthrough();
