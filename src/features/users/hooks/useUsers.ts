import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import {
  archiveUser,
  deleteUser,
  getUsers,
  unarchiveUser,
  type UserRow,
} from "@/entities/users";

export const useUsers = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isArchived, setIsArchived] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["users", page, limit, isArchived],
    queryFn: () => getUsers(page + 1, limit, isArchived),
    staleTime: 5000,
  });

  const users: UserRow[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const hasUsers = users.length > 0;

  const emptyText = isArchived
    ? "Нет архивных пользователей"
    : "Нет активных пользователей";

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["users"] });

  const toggleArchiveMutation = useMutation({
    mutationFn: ({
      userId,
      archived,
    }: {
      userId: number;
      archived: boolean;
    }) => (archived ? unarchiveUser(userId) : archiveUser(userId)),
    onSuccess: (_, { archived }) => {
      toast.success(
        archived ? "Пользователь разархивирован" : "Пользователь архивирован",
      );
      void invalidate();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при изменении статуса пользователя",
      );
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: () => {
      toast.success("Пользователь удален");
      void invalidate();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при удалении пользователя",
      );
    },
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
