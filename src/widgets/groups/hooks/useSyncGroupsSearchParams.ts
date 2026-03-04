import { createGroupsSearchString, type GroupsSearchState } from "@/features/groups";

import { useSyncSearchParams } from "@/shared/hooks";

export const useSyncGroupsSearchParams = (state: GroupsSearchState) =>
  useSyncSearchParams(state, createGroupsSearchString);
