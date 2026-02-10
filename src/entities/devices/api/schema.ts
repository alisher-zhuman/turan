import { z } from "zod";

const DeviceUserSchema = z
  .object({
    firstName: z.string().nullable().optional(),
    lastName: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
  })
  .passthrough();

export const DeviceSchema = z
  .object({
    id: z.number(),
    deviceId: z.string(),
    verified: z.boolean(),
    createdAt: z.string(),
    user: DeviceUserSchema.nullable().optional(),
  })
  .passthrough();

export const DevicesResponseSchema = z
  .object({
    data: z.array(DeviceSchema),
    total: z.number(),
  })
  .passthrough();
