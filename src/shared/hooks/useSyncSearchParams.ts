import { useEffect, useMemo } from "react";

import { useSearchParams } from "react-router";

export const useSyncSearchParams = <T>(
  state: T,
  createSearchString: (state: T) => string,
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchString = useMemo(
    () => createSearchString(state),
    [createSearchString, state],
  );

  const currentSearchString = searchParams.toString();

  useEffect(() => {
    if (currentSearchString === searchString) {
      return;
    }

    setSearchParams(new URLSearchParams(searchString), { replace: true });
  }, [currentSearchString, searchString, setSearchParams]);
};
