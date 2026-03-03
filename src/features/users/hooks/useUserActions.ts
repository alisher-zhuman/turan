import type { AxiosError } from "axios";

import {
  archiveUser,
  deleteUser,
  unarchiveUser,
  usersKeys,
} from "@/entities/users";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

export const useUserActions = () => {
  const toggleArchiveMutation = useToastMutation({
    mutationFn: ({
      userId,
      archived,
    }: {
      userId: number;
      archived: boolean;
    }) => (archived ? unarchiveUser(userId) : archiveUser(userId)),
    invalidateKeys: [usersKeys.all],
    successMessage: (_, { archived }) =>
      archived ? "Пользователь разархивирован" : "Пользователь архивирован",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при изменении статуса пользователя"),
  });

  const deleteUserMutation = useToastMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    invalidateKeys: [usersKeys.all],
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
