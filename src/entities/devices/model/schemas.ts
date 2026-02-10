import { z } from "zod";

const DeviceUserSchema = z
  .object({
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    email: z.string().nullable(),
  })
  .passthrough();

const DeviceSchema = z
  .object({
    id: z.number(),
    deviceId: z.string(),
    verified: z.boolean(),
    createdAt: z.string(),
    user: DeviceUserSchema.nullable(),
  })
  .passthrough();

export const DevicesResponseSchema = z
  .object({
    data: z.array(DeviceSchema),
    total: z.number(),
  })
  .passthrough();
