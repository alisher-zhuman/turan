import { useState } from "react";

import { useSearchParams } from "react-router";

import { parseReadingsSearchState } from "@/features/readings";

export const useInitialReadingsSearchState = () => {
  const [searchParams] = useSearchParams();
  
  const [initialSearchState] = useState(() =>
    parseReadingsSearchState(searchParams),
  );

  return initialSearchState;
};
