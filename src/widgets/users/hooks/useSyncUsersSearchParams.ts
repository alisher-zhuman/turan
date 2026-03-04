import { useEffect, useMemo } from "react";

import { useSearchParams } from "react-router";

import { createUsersSearchString } from "@/features/users/helpers/search-params";
import type { UsersSearchState } from "@/features/users/types/search-params";

export const useSyncUsersSearchParams = (state: UsersSearchState) => {
  const { page, limit, isArchived } = state;

  const [searchParams, setSearchParams] = useSearchParams();

  const usersSearchString = useMemo(
    () =>
      createUsersSearchString({
        page,
        limit,
        isArchived,
      }),
    [page, limit, isArchived],
  );

  const currentSearchString = searchParams.toString();

  useEffect(() => {
    if (currentSearchString === usersSearchString) {
      return;
    }

    setSearchParams(new URLSearchParams(usersSearchString), { replace: true });
  }, [currentSearchString, usersSearchString, setSearchParams]);
};
