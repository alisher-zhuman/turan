import type { Meter } from "@/features/meters/interfaces";

export interface CreateReadingColumnsParams {
  isAdmin: boolean;
  selectedIds: string[];
  allSelected: boolean;
  isIndeterminate: boolean;
  onToggleAll: (checked: boolean) => void;
  onToggleOne: (id: string) => void;
  onDeleteOne: (id: string) => void;
}

export interface Reading {
  id: string;
  value: string;
  valveState: "open" | "closed";
  batteryStatus: number;
  meter: Meter;
  readingAt: string;
}
