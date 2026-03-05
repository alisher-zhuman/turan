export interface ReadingsFilters {
  meterId: number | null;
  customerId: string;
  client: string;
  address: string;
  dateFrom: string;
  dateTo: string;
}

export interface ReadingsSearchState {
  page: number;
  limit: number;
  filters: ReadingsFilters;
}

export interface ReadingsSearchSyncState extends ReadingsFilters {
  page: number;
  limit: number;
}
