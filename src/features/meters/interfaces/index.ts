export interface Meter {
  id: number;
  name: string;
  password: string;
  customerID: number | null;
  client: string | null;
  address: string | null;
  descriptions: string | null;
  valveStatus: "open" | "closed";
  valveStatusChange: string | null;
  batteryStatus: string | null;
  lastReading: number | null;
  pendingCommand: string | null;
  status: "normal" | "warning" | "error";
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}

export interface CreateMeterColumnsParams {
  isAdmin: boolean;
  canEdit: boolean;
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
