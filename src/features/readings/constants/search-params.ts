import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/shared/constants";

import type { ReadingsFilters } from "../types";

export const DEFAULT_READINGS_FILTERS: ReadingsFilters = {
  meterId: null,
  customerId: "",
  client: "",
  address: "",
  dateFrom: "",
  dateTo: "",
};

export { DEFAULT_LIMIT, DEFAULT_PAGE };
