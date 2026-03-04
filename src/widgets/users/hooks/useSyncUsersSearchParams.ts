import { createUsersSearchString, type UsersSearchState } from "@/features/users";

import { useSyncSearchParams } from "@/shared/hooks";

export const useSyncUsersSearchParams = (state: UsersSearchState) =>
  useSyncSearchParams(state, createUsersSearchString);
