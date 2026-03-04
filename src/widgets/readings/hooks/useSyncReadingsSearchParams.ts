import { useEffect, useMemo } from "react";

import { useSearchParams } from "react-router";

import {
  createReadingsSearchString,
  type ReadingsSearchState,
} from "@/features/readings";

export const useSyncReadingsSearchParams = (state: ReadingsSearchState) => {
  const { page, limit } = state;

  const [searchParams, setSearchParams] = useSearchParams();

  const readingsSearchString = useMemo(
    () =>
      createReadingsSearchString({
        page,
        limit,
      }),
    [page, limit],
  );

  const currentSearchString = searchParams.toString();

  useEffect(() => {
    if (currentSearchString === readingsSearchString) {
      return;
    }

    setSearchParams(new URLSearchParams(readingsSearchString), {
      replace: true,
    });
  }, [currentSearchString, readingsSearchString, setSearchParams]);
};
