export type ValveFilter = "all" | "open" | "closed";

export interface MeterSearchFilters {
  status: string;
  isArchived: boolean;
  groupId: number | null;
  customerId: string;
  meterName: string;
  valveFilter: ValveFilter;
}

export interface MeterSearchState {
  page: number;
  limit: number;
  filters: MeterSearchFilters;
}

export interface MetersSearchSyncState extends MeterSearchFilters {
  page: number;
  limit: number;
}
