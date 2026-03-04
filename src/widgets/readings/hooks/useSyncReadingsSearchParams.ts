import {
  createReadingsSearchString,
  type ReadingsSearchState,
} from "@/features/readings";

import { useSyncSearchParams } from "@/shared/hooks";

export const useSyncReadingsSearchParams = (state: ReadingsSearchState) =>
  useSyncSearchParams(state, createReadingsSearchString);
