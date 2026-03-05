import type { ValveFilter } from "../types";

export const DEFAULT_STATUS = "all";
export const DEFAULT_VALVE_FILTER: ValveFilter = "all";
export const VALID_STATUSES = new Set(["all", "normal", "warning", "error"]);
export const VALID_VALVE_FILTERS = new Set<ValveFilter>(["all", "open", "closed"]);
