import { useQuery } from "@tanstack/react-query";

import { getGroups, type Group,groupsKeys } from "@/entities/groups";

interface Params {
  page: number;
  limit: number;
  forFilter: boolean;
}

export const useGroupsQuery = ({ page, limit, forFilter }: Params) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: forFilter ? groupsKeys.filter() : groupsKeys.list(page, limit),
    queryFn: () =>
      forFilter ? getGroups(1, 1000) : getGroups(page + 1, limit),
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
