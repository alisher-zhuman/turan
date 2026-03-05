import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/shared/constants";
import { parsePositiveInt } from "@/shared/helpers";

import { DEFAULT_READINGS_FILTERS } from "../constants";
import type { ReadingsSearchState, ReadingsSearchSyncState } from "../types";

const normalizeTextParam = (value: string | null) => value?.trim() ?? "";

const normalizeDateParam = (value: string | null) => {
  const normalized = value?.trim() ?? "";

  if (!normalized) {
    return "";
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : "";
};

export const parseReadingsSearchState = (
  params: URLSearchParams,
): ReadingsSearchState => {
  const page = parsePositiveInt(params.get("page"));
  const limit = parsePositiveInt(params.get("limit"));
  const meterId = parsePositiveInt(params.get("meterId"));

  return {
    page: page ? page - 1 : DEFAULT_PAGE,
    limit: limit ?? DEFAULT_LIMIT,
    filters: {
      meterId,
      customerId: normalizeTextParam(params.get("customerId")),
      client: normalizeTextParam(params.get("client")),
      address: normalizeTextParam(params.get("address")),
      dateFrom: normalizeDateParam(params.get("dateFrom")),
      dateTo: normalizeDateParam(params.get("dateTo")),
    },
  };
};

export const createReadingsSearchString = ({
  page,
  limit,
  meterId,
  customerId,
  client,
  address,
  dateFrom,
  dateTo,
}: ReadingsSearchSyncState) => {
  const params = new URLSearchParams();

  if (page > DEFAULT_PAGE) {
    params.set("page", String(page + 1));
  }

  if (limit !== DEFAULT_LIMIT) {
    params.set("limit", String(limit));
  }

  if (meterId !== DEFAULT_READINGS_FILTERS.meterId) {
    params.set("meterId", String(meterId));
  }

  if (customerId.trim() !== DEFAULT_READINGS_FILTERS.customerId) {
    params.set("customerId", customerId.trim());
  }

  if (client.trim() !== DEFAULT_READINGS_FILTERS.client) {
    params.set("client", client.trim());
  }

  if (address.trim() !== DEFAULT_READINGS_FILTERS.address) {
    params.set("address", address.trim());
  }

  if (dateFrom !== DEFAULT_READINGS_FILTERS.dateFrom) {
    params.set("dateFrom", dateFrom);
  }

  if (dateTo !== DEFAULT_READINGS_FILTERS.dateTo) {
    params.set("dateTo", dateTo);
  }

  return params.toString();
};
