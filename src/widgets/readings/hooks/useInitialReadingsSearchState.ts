import { parseReadingsSearchState } from "@/features/readings";

import { useInitialSearchState } from "@/shared/hooks";

export const useInitialReadingsSearchState = () =>
  useInitialSearchState(parseReadingsSearchState);
