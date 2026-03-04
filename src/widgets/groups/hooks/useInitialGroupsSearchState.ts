import { parseGroupsSearchState } from "@/features/groups";

import { useInitialSearchState } from "@/shared/hooks";

export const useInitialGroupsSearchState = () =>
  useInitialSearchState(parseGroupsSearchState);
