import { z } from "zod";

const ReadingMeterSchema = z
  .object({
    name: z.string(),
  })
  .passthrough();

export const ReadingSchema = z
  .object({
    id: z.string(),
    value: z.string(),
    valveState: z.string(),
    batteryStatus: z.number().nullable().optional(),
    meter: ReadingMeterSchema,
    readingAt: z.string(),
  })
  .passthrough();

export const ReadingsResponseSchema = z
  .object({
    data: z.array(ReadingSchema),
    total: z.number(),
  })
  .passthrough();
