import { useEffect, useMemo } from "react";

import { useSearchParams } from "react-router";

import {
  createDevicesSearchString,
  type DevicesSearchState,
} from "@/features/devices";

export const useSyncDevicesSearchParams = (state: DevicesSearchState) => {
  const { page, limit, verified } = state;

  const [searchParams, setSearchParams] = useSearchParams();

  const devicesSearchString = useMemo(
    () =>
      createDevicesSearchString({
        page,
        limit,
        verified,
      }),
    [page, limit, verified],
  );

  const currentSearchString = searchParams.toString();

  useEffect(() => {
    if (currentSearchString === devicesSearchString) {
      return;
    }

    setSearchParams(new URLSearchParams(devicesSearchString), { replace: true });
  }, [currentSearchString, devicesSearchString, setSearchParams]);
};
