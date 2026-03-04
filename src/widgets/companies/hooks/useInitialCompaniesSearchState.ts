import { useState } from "react";

import { useSearchParams } from "react-router";

import { parseCompaniesSearchState } from "@/features/companies";

export const useInitialCompaniesSearchState = () => {
  const [searchParams] = useSearchParams();
  
  const [initialSearchState] = useState(() =>
    parseCompaniesSearchState(searchParams),
  );

  return initialSearchState;
};
