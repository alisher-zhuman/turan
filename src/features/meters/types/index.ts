import type { Meter } from "@/shared/types";

export interface CreateMeterColumnsParams {
  isAdmin: boolean;
  canEdit: boolean;
  canManageMetersToGroups?: boolean;
  selectedIds: number[];
  allSelected: boolean;
  isIndeterminate: boolean;
  onToggleAll: (checked: boolean) => void;
  onToggleOne: (id: number) => void;
  onEdit: (meter: Meter) => void;
  onDeleteOne: (id: number) => void;
  onCommand: (id: number, command: "open" | "close") => void;
  onView: (meter: Meter) => void;
}
