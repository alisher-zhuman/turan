import { parseMeterSearchState } from "@/features/meters";

import { useInitialSearchState } from "@/shared/hooks";

export const useInitialMetersSearchState = () =>
  useInitialSearchState(parseMeterSearchState);
