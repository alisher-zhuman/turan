import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

import { getUsers, archiveUser, unarchiveUser } from "@/features/users/api";
import type { User } from "@/features/authentication/interfaces/auth";

type UserRow = Omit<User, "company" | "devices">;

export const useUsers = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isArchived, setIsArchived] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
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

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const handleToggleArchive = async (userId: number, archived: boolean) => {
    try {
      if (archived) {
        await unarchiveUser(userId);
        toast.success("Пользователь разархивирован");
      } else {
        await archiveUser(userId);
        toast.success("Пользователь архивирован");
      }

      await invalidate();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при изменении статуса пользователя"
      );
    }
  };

  return {
    users,
    total,
    hasUsers,
    emptyText,
    isLoading,
    isError,

    page,
    limit,
    setPage,
    setLimit,

    isArchived,
    setIsArchived,

    handleToggleArchive,
  };
};
