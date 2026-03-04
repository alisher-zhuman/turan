import { useState } from "react";

import { useSearchParams } from "react-router";

import { parseUsersSearchState } from "@/features/users";

export const useInitialUsersSearchState = () => {
  const [searchParams] = useSearchParams();
  
  const [initialSearchState] = useState(() => parseUsersSearchState(searchParams));

  return initialSearchState;
};
