import { parseBooleanFlag } from "@/shared/helpers";

import { DEFAULT_ARCHIVED } from "../constants";
import type { CompaniesSearchState } from "../types";

export const parseCompaniesSearchState = (
  params: URLSearchParams,
): CompaniesSearchState => {
  const archivedRaw = params.get("archived");

  if (archivedRaw === null) {
    return {
      isArchived: DEFAULT_ARCHIVED,
    };
  }

  return {
    isArchived: parseBooleanFlag(archivedRaw),
  };
};

export const createCompaniesSearchString = ({
  isArchived,
}: CompaniesSearchState) => {
  const params = new URLSearchParams();

  if (isArchived) {
    params.set("archived", "1");
  }

  return params.toString();
};
