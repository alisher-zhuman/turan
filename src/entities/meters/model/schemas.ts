import { z } from "zod";

const ValveStatusSchema = z.enum(["open", "closed"]);
const MeterStatusSchema = z.enum(["normal", "warning", "error"]);
const NullableNumberSchema = z.coerce.number().finite().nullable();

const MeterSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    password: z.string(),
    customerID: z.string().nullable(),
    client: z.string().nullable(),
    address: z.string().nullable(),
    descriptions: z.string().nullable(),
    valveStatus: ValveStatusSchema,
    valveStatusChange: z.string().nullable(),
    batteryStatus: NullableNumberSchema,
    lastReading: NullableNumberSchema,
    pendingCommand: z.string().nullable(),
    status: MeterStatusSchema,
    errorMessage: z.string().nullable(),
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
