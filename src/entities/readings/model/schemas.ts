import { z } from "zod";

const ValveStateSchema = z.enum(["open", "closed"]);
const BatteryStatusSchema = z.number().nullable();

const ReadingMeterSchema = z
  .object({
    name: z.string(),
  })
  .passthrough();

const ReadingSchema = z
  .object({
    id: z.string(),
    value: z.string(),
    valveState: ValveStateSchema,
    batteryStatus: BatteryStatusSchema,
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
