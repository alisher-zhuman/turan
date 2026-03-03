import { useQuery } from "@tanstack/react-query";

import { getGroups, type Group, groupsKeys } from "@/entities/groups";

const GROUPS_LIST_QUERY_OPTIONS = {
  staleTime: 30_000,
  retry: 1,
} as const;

const GROUPS_FILTER_QUERY_OPTIONS = {
  staleTime: 120_000,
  retry: 1,
} as const;

interface Params {
  page: number;
  limit: number;
  forFilter: boolean;
}

export const useGroupsQuery = ({ page, limit, forFilter }: Params) => {
  const queryOptions = forFilter
    ? GROUPS_FILTER_QUERY_OPTIONS
    : GROUPS_LIST_QUERY_OPTIONS;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: forFilter ? groupsKeys.filter() : groupsKeys.list(page, limit),
    queryFn: () =>
      forFilter ? getGroups(1, 1000) : getGroups(page + 1, limit),
    staleTime: queryOptions.staleTime,
    retry: queryOptions.retry,
  });

  const groups: Group[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const hasGroups = groups.length > 0;
  const emptyText = "Группы не найдены";

  return {
    groups,
    total,
    hasGroups,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
