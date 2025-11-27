import type { User } from "@/features/authentication/interfaces/auth";

export interface Device {
  id: number;
  deviceId: string;
  verified: boolean;
  createdAt: string;
  isArchived: boolean;
  user?: Omit<User, "company" | "devices"> | null;
}

export interface CreateDeviceColumnsParams {
  selectedIds: number[];
  allSelected: boolean;
  isIndeterminate: boolean;
  onToggleAll: (checked: boolean) => void;
  onToggleOne: (id: number) => void;
  onVerify: (id: number) => void;
  onDeleteOne: (id: number) => void;
}
