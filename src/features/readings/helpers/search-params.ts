import { parsePositiveInt } from "@/shared/helpers";

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";
import type { ReadingsSearchState } from "../types";

export const parseReadingsSearchState = (
  params: URLSearchParams,
): ReadingsSearchState => {
  const page = parsePositiveInt(params.get("page"));
  const limit = parsePositiveInt(params.get("limit"));

  return {
    page: page ? page - 1 : DEFAULT_PAGE,
    limit: limit ?? DEFAULT_LIMIT,
  };
};

export const createReadingsSearchString = ({
  page,
  limit,
}: ReadingsSearchState) => {
  const params = new URLSearchParams();

  if (page > DEFAULT_PAGE) {
    params.set("page", String(page + 1));
  }

  if (limit !== DEFAULT_LIMIT) {
    params.set("limit", String(limit));
  }

  return params.toString();
};
