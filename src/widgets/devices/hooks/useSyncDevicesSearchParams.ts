import {
  createDevicesSearchString,
  type DevicesSearchState,
} from "@/features/devices";

import { useSyncSearchParams } from "@/shared/hooks";

export const useSyncDevicesSearchParams = (state: DevicesSearchState) =>
  useSyncSearchParams(state, createDevicesSearchString);
