import { useState } from "react";

import { useSearchParams } from "react-router";

import { parseGroupsSearchState } from "@/features/groups";

export const useInitialGroupsSearchState = () => {
  const [searchParams] = useSearchParams();
  
  const [initialSearchState] = useState(() => parseGroupsSearchState(searchParams));

  return initialSearchState;
};
