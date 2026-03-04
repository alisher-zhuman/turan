export interface CreateDeviceColumnsParams {
  selectedIds: number[];
  allSelected: boolean;
  isIndeterminate: boolean;
  onToggleAll: (checked: boolean) => void;
  onToggleOne: (id: number) => void;
  onVerify: (id: number) => void;
  onDeleteOne: (id: number) => void;
}

export type { DevicesSearchState } from "./search-params";
