import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_STATUS,
  DEFAULT_VALVE_FILTER,
  VALID_STATUSES,
  VALID_VALVE_FILTERS,
} from "./constants";
import type { MeterSearchState, MetersSearchSyncState, ValveFilter } from "./types";

const parsePositiveInt = (value: string | null): number | null => {
  if (!value) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

export const parseMeterSearchState = (params: URLSearchParams): MeterSearchState => {
  const page = parsePositiveInt(params.get("page"));
  const limit = parsePositiveInt(params.get("limit"));
  const groupId = parsePositiveInt(params.get("groupId"));

  const statusRaw = params.get("status")?.trim() ?? DEFAULT_STATUS;
  const status = VALID_STATUSES.has(statusRaw) ? statusRaw : DEFAULT_STATUS;

  const archivedRaw = params.get("archived");
  const isArchived = archivedRaw === "1" || archivedRaw === "true";

  const valveRaw = params.get("valve") as ValveFilter | null;
  const valveFilter = VALID_VALVE_FILTERS.has(
    valveRaw ?? DEFAULT_VALVE_FILTER,
  )
    ? (valveRaw ?? DEFAULT_VALVE_FILTER)
    : DEFAULT_VALVE_FILTER;

  return {
    page: page ? page - 1 : DEFAULT_PAGE,
    limit: limit ?? DEFAULT_LIMIT,
    filters: {
      status,
      isArchived,
      groupId,
      customerId: params.get("customerId")?.trim() ?? "",
      meterName: params.get("meterName")?.trim() ?? "",
      valveFilter,
    },
  };
};

export const createMetersSearchString = ({
  page,
  limit,
  status,
  isArchived,
  groupId,
  customerId,
  meterName,
  valveFilter,
}: MetersSearchSyncState) => {
  const params = new URLSearchParams();

  if (page > DEFAULT_PAGE) {
    params.set("page", String(page + 1));
  }

  if (limit !== DEFAULT_LIMIT) {
    params.set("limit", String(limit));
  }

  if (status !== DEFAULT_STATUS) {
    params.set("status", status);
  }

  if (isArchived) {
    params.set("archived", "1");
  }

  if (groupId !== null) {
    params.set("groupId", String(groupId));
  }

  const normalizedCustomerId = customerId.trim();
  const normalizedMeterName = meterName.trim();

  if (normalizedCustomerId) {
    params.set("customerId", normalizedCustomerId);
  }

  if (normalizedMeterName) {
    params.set("meterName", normalizedMeterName);
  }

  if (valveFilter !== DEFAULT_VALVE_FILTER) {
    params.set("valve", valveFilter);
  }

  return params.toString();
};
