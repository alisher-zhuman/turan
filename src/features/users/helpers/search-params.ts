import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";
import type { UsersSearchState } from "../types";

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

export const parseUsersSearchState = (
  params: URLSearchParams,
): UsersSearchState => {
  const page = parsePositiveInt(params.get("page"));
  const limit = parsePositiveInt(params.get("limit"));
  const archivedRaw = params.get("archived");

  return {
    page: page ? page - 1 : DEFAULT_PAGE,
    limit: limit ?? DEFAULT_LIMIT,
    isArchived: archivedRaw === "1" || archivedRaw === "true",
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
