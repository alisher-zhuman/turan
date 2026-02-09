export interface CreateReadingColumnsParams {
  isAdmin: boolean;
  selectedIds: string[];
  allSelected: boolean;
  isIndeterminate: boolean;
  onToggleAll: (checked: boolean) => void;
  onToggleOne: (id: string) => void;
  onDeleteOne: (id: string) => void;
}
