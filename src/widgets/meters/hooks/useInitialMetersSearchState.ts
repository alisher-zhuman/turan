import { useState } from "react";

import { useSearchParams } from "react-router";

import { parseMeterSearchState } from "@/features/meters/model/search-params/helpers";

export const useInitialMetersSearchState = () => {
  const [searchParams] = useSearchParams();

  const [initialSearchState] = useState(() => parseMeterSearchState(searchParams));

  return initialSearchState;
};
