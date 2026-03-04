import { useEffect, useMemo } from "react";

import { useSearchParams } from "react-router";

import { createGroupsSearchString, type GroupsSearchState } from "@/features/groups";

export const useSyncGroupsSearchParams = (state: GroupsSearchState) => {
  const { page, limit } = state;

  const [searchParams, setSearchParams] = useSearchParams();

  const groupsSearchString = useMemo(
    () =>
      createGroupsSearchString({
        page,
        limit,
      }),
    [page, limit],
  );

  const currentSearchString = searchParams.toString();

  useEffect(() => {
    if (currentSearchString === groupsSearchString) {
      return;
    }

    setSearchParams(new URLSearchParams(groupsSearchString), { replace: true });
  }, [currentSearchString, groupsSearchString, setSearchParams]);
};
