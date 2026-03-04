import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";
import type { GroupsSearchState } from "../types";

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

export const parseGroupsSearchState = (
  params: URLSearchParams,
): GroupsSearchState => {
  const page = parsePositiveInt(params.get("page"));
  const limit = parsePositiveInt(params.get("limit"));

  return {
    page: page ? page - 1 : DEFAULT_PAGE,
    limit: limit ?? DEFAULT_LIMIT,
  };
};

export const createGroupsSearchString = ({ page, limit }: GroupsSearchState) => {
  const params = new URLSearchParams();

  if (page > DEFAULT_PAGE) {
    params.set("page", String(page + 1));
  }

  if (limit !== DEFAULT_LIMIT) {
    params.set("limit", String(limit));
  }

  return params.toString();
};
