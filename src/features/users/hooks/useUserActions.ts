import type { AxiosError } from "axios";
import {
  archiveUser,
  deleteUser,
  unarchiveUser,
} from "@/entities/users";
import { useToastMutation } from "@/shared/hooks";
import { getApiErrorMessage } from "@/shared/helpers";

export const useUserActions = () => {
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
    handleToggleArchive,
    handleDeleteUser,
  };
};
