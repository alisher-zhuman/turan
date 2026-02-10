import { z } from "zod";

export const MeterSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    password: z.string(),
    customerID: z.string().nullable().optional(),
    client: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    descriptions: z.string().nullable().optional(),
    valveStatus: z.string().nullable().optional(),
    valveStatusChange: z.string().nullable().optional(),
    batteryStatus: z.string().nullable().optional(),
    lastReading: z.number().nullable().optional(),
    pendingCommand: z.string().nullable().optional(),
    status: z.string(),
    errorMessage: z.string().nullable().optional(),
    isArchived: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .passthrough();

export const MetersResponseSchema = z
  .object({
    data: z.array(MeterSchema),
    total: z.number(),
  })
  .passthrough();
