import {
  type CompaniesSearchState,
  createCompaniesSearchString,
} from "@/features/companies";

import { useSyncSearchParams } from "@/shared/hooks";

export const useSyncCompaniesSearchParams = (state: CompaniesSearchState) =>
  useSyncSearchParams(state, createCompaniesSearchString);
