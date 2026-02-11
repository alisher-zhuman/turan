import type { AxiosError } from "axios";
import {
  addMetersToGroup,
  deleteGroup,
  removeMetersFromGroup,
} from "@/entities/groups";
import { useToastMutation } from "@/shared/hooks";
import { getApiErrorMessage } from "@/shared/helpers";

interface Params {
  isAdmin: boolean;
  canManageMetersToGroups: boolean;
}

export const useGroupActions = ({
  isAdmin,
  canManageMetersToGroups,
}: Params) => {
  const deleteMutation = useToastMutation({
    mutationFn: (groupId: number) => deleteGroup(groupId),
    invalidateKeys: [["groups"]],
    successMessage: "Группа удалена",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при удалении группы"),
  });

  const addMetersMutation = useToastMutation({
    mutationFn: ({
      groupId,
      meterIds,
    }: {
      groupId: number;
      meterIds: number[];
    }) => addMetersToGroup(groupId, meterIds),
    invalidateKeys: [["meters"]],
    successMessage: (data) => {
      const message = (data as { message?: string })?.message;
      return message || null;
    },
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при добавлении в группу"),
  });

  const removeMetersMutation = useToastMutation({
    mutationFn: ({
      groupId,
      meterIds,
    }: {
      groupId: number;
      meterIds: number[];
    }) => removeMetersFromGroup(groupId, meterIds),
    invalidateKeys: [["meters"]],
    successMessage: (data) => {
      const message = (data as { message?: string })?.message;
      return message || null;
    },
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при удалении из группы"),
  });

  const handleDelete = (groupId: number) => {
    if (!isAdmin) return;
    deleteMutation.mutate(groupId);
  };

  const handleAddMetersToGroup = (groupId: number, meterIds: number[]) => {
    if (!canManageMetersToGroups) return;
    addMetersMutation.mutate({ groupId, meterIds });
  };

  const handleRemoveMetersFromGroup = (
    groupId: number,
    meterIds: number[],
  ) => {
    if (!canManageMetersToGroups) return;
    removeMetersMutation.mutate({ groupId, meterIds });
  };

  return {
    handleDelete,
    handleAddMetersToGroup,
    handleRemoveMetersFromGroup,
  };
};
