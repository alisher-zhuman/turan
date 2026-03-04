import { parseCompaniesSearchState } from "@/features/companies";

import { useInitialSearchState } from "@/shared/hooks";

export const useInitialCompaniesSearchState = () =>
  useInitialSearchState(parseCompaniesSearchState);
