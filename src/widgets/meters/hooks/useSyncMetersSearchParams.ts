import { createMetersSearchString, type MetersSearchSyncState } from "@/features/meters";

import { useSyncSearchParams } from "@/shared/hooks";

export const useSyncMetersSearchParams = (state: MetersSearchSyncState) =>
  useSyncSearchParams(state, createMetersSearchString);
