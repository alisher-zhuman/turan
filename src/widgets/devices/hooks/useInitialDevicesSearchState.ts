import { useState } from "react";

import { useSearchParams } from "react-router";

import { parseDevicesSearchState } from "@/features/devices";

export const useInitialDevicesSearchState = () => {
  const [searchParams] = useSearchParams();

  const [initialSearchState] = useState(() =>
    parseDevicesSearchState(searchParams),
  );

  return initialSearchState;
};
