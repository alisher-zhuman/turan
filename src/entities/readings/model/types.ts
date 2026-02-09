import type { Meter } from "@/shared/types";

export interface Reading {
  id: string;
  value: string;
  valveState: "open" | "closed";
  batteryStatus: number;
  meter: Meter;
  readingAt: string;
}
