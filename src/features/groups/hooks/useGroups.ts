import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useAuthStore } from "@/shared/stores";
import {
  addMetersToGroup,
  deleteGroup,
  getGroups,
  removeMetersFromGroup,
  type Group,
} from "@/entities/groups";
import { useToastMutation } from "@/shared/hooks";
import {
  canManageMetersToGroups as canManageMetersToGroupsRole,
  hasRoleAdmin,
} from "@/shared/helpers";

interface Props {
  forFilter?: boolean;
}

export const useGroups = ({ forFilter = false }: Props) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { user } = useAuthStore();

  const isAdmin = hasRoleAdmin(user?.role);
  const canManageMetersToGroups = canManageMetersToGroupsRole(user?.role);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: forFilter
      ? ["groups", "all-for-filter"]
      : ["groups", page, limit],
    queryFn: () =>
      forFilter ? getGroups(1, 1000) : getGroups(page + 1, limit),
    staleTime: 5000,
  });

  const groups: Group[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const hasGroups = groups.length > 0;
  const emptyText = "Группы не найдены";

  const deleteMutation = useToastMutation({
    mutationFn: (groupId: number) => deleteGroup(groupId),
    invalidateKeys: [["groups"]],
    successMessage: "Группа удалена",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      error.response?.data?.message || "Ошибка при удалении группы",
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
      error.response?.data?.message || "Ошибка при добавлении в группу",
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
      error.response?.data?.message || "Ошибка при удалении из группы",
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
    groups,
    total,
    hasGroups,
    emptyText,
    isLoading,
    isError,
    isFetching,

    page,
    limit,
    setPage,
    setLimit,

    isAdmin,
    handleDelete,

    handleAddMetersToGroup,
    handleRemoveMetersFromGroup,
  };
};
