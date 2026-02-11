import { useQuery } from "@tanstack/react-query";
import { getUsers, type UserRow } from "@/entities/users";

interface Params {
  page: number;
  limit: number;
  isArchived: boolean;
}

export const useUsersQuery = ({ page, limit, isArchived }: Params) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["users", page, limit, isArchived],
    queryFn: () => getUsers(page + 1, limit, isArchived),
  });

  const users: UserRow[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const hasUsers = users.length > 0;

  const emptyText = isArchived
    ? "Нет архивных пользователей"
    : "Нет активных пользователей";

  return {
    users,
    total,
    hasUsers,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
