import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";
import type { DevicesSearchState } from "../types";

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

export const parseDevicesSearchState = (
  params: URLSearchParams,
): DevicesSearchState => {
  const page = parsePositiveInt(params.get("page"));
  const limit = parsePositiveInt(params.get("limit"));
  const verifiedRaw = params.get("verified");

  return {
    page: page ? page - 1 : DEFAULT_PAGE,
    limit: limit ?? DEFAULT_LIMIT,
    verified: verifiedRaw === "1" || verifiedRaw === "true",
  };
};

export const createDevicesSearchString = ({
  page,
  limit,
  verified,
}: DevicesSearchState) => {
  const params = new URLSearchParams();

  if (page > DEFAULT_PAGE) {
    params.set("page", String(page + 1));
  }

  if (limit !== DEFAULT_LIMIT) {
    params.set("limit", String(limit));
  }

  if (verified) {
    params.set("verified", "1");
  }

  return params.toString();
};
