import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/shared/constants";
import { parseBooleanFlag, parsePositiveInt } from "@/shared/helpers";

import type { UsersSearchState } from "../types";

export const parseUsersSearchState = (
  params: URLSearchParams,
): UsersSearchState => {
  const page = parsePositiveInt(params.get("page"));
  const limit = parsePositiveInt(params.get("limit"));
  const archivedRaw = params.get("archived");

  return {
    page: page ? page - 1 : DEFAULT_PAGE,
    limit: limit ?? DEFAULT_LIMIT,
    isArchived: parseBooleanFlag(archivedRaw),
  };
};

export const createUsersSearchString = ({
  page,
  limit,
  isArchived,
}: UsersSearchState) => {
  const params = new URLSearchParams();

  if (page > DEFAULT_PAGE) {
    params.set("page", String(page + 1));
  }

  if (limit !== DEFAULT_LIMIT) {
    params.set("limit", String(limit));
  }

  if (isArchived) {
    params.set("archived", "1");
  }

  return params.toString();
};
