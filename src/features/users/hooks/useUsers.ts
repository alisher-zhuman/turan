import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  archiveUser,
  deleteUser,
  getUsers,
  unarchiveUser,
  type UserRow,
} from "@/entities/users";
import { usePagination, useToastMutation } from "@/shared/hooks";
import { getApiErrorMessage } from "@/shared/helpers";

export const useUsers = () => {
  const [isArchived, setIsArchived] = useState(false);

  const { page, limit, setPage, setLimit } = usePagination({
    resetKey: isArchived ? "archived" : "active",
  });

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

  const toggleArchiveMutation = useToastMutation({
    mutationFn: ({
      userId,
      archived,
    }: {
      userId: number;
      archived: boolean;
    }) => (archived ? unarchiveUser(userId) : archiveUser(userId)),
    invalidateKeys: [["users"]],
    successMessage: (_, { archived }) =>
      archived ? "Пользователь разархивирован" : "Пользователь архивирован",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при изменении статуса пользователя"),
  });

  const deleteUserMutation = useToastMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    invalidateKeys: [["users"]],
    successMessage: "Пользователь удален",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при удалении пользователя"),
  });

  const handleToggleArchive = (userId: number, archived: boolean) => {
    toggleArchiveMutation.mutate({ userId, archived });
  };

  const handleDeleteUser = (userId: number) => {
    deleteUserMutation.mutate(userId);
  };

  return {
    users,
    total,
    hasUsers,
    emptyText,
    isLoading,
    isError,
    isFetching,

    page,
    limit,
    setPage,
    setLimit,

    isArchived,
    setIsArchived,

    handleToggleArchive,
    handleDeleteUser,
  };
};
