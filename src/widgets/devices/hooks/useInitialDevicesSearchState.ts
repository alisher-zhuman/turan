import { parseDevicesSearchState } from "@/features/devices";

import { useInitialSearchState } from "@/shared/hooks";

export const useInitialDevicesSearchState = () =>
  useInitialSearchState(parseDevicesSearchState);
