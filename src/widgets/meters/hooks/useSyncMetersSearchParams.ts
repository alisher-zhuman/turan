import { useEffect, useMemo } from "react";

import { useSearchParams } from "react-router";

import { createMetersSearchString, type MetersSearchSyncState } from "@/features/meters";

export const useSyncMetersSearchParams = (state: MetersSearchSyncState) => {
  const {
    page,
    limit,
    status,
    isArchived,
    groupId,
    customerId,
    meterName,
    valveFilter,
  } = state;

  const [searchParams, setSearchParams] = useSearchParams();

  const metersSearchString = useMemo(
    () =>
      createMetersSearchString({
        page,
        limit,
        status,
        isArchived,
        groupId,
        customerId,
        meterName,
        valveFilter,
      }),
    [
      page,
      limit,
      status,
      isArchived,
      groupId,
      customerId,
      meterName,
      valveFilter,
    ],
  );

  const currentSearchString = searchParams.toString();

  useEffect(() => {
    if (currentSearchString === metersSearchString) {
      return;
    }

    setSearchParams(new URLSearchParams(metersSearchString), { replace: true });
  }, [currentSearchString, metersSearchString, setSearchParams]);
};
