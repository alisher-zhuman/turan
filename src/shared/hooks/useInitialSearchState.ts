import { useState } from "react";

import { useSearchParams } from "react-router";

export const useInitialSearchState = <T>(
  parseSearchState: (params: URLSearchParams) => T,
) => {
  const [searchParams] = useSearchParams();
  
  const [initialSearchState] = useState(() => parseSearchState(searchParams));

  return initialSearchState;
};
