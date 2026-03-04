import { parseUsersSearchState } from "@/features/users";

import { useInitialSearchState } from "@/shared/hooks";

export const useInitialUsersSearchState = () =>
  useInitialSearchState(parseUsersSearchState);
