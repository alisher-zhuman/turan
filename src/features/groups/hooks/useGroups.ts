import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useAuthStore } from "@/shared/stores";
import {
  addMetersToGroup,
  deleteGroup,
  getGroups,
  removeMetersFromGroup,
  type Group,
} from "@/entities/groups";
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

  const queryClient = useQueryClient();

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

  const invalidateGroups = () =>
    queryClient.invalidateQueries({ queryKey: ["groups"] });

  const invalidateMeters = () =>
    queryClient.invalidateQueries({ queryKey: ["meters"] });

  const deleteMutation = useMutation({
    mutationFn: (groupId: number) => deleteGroup(groupId),
    onSuccess: () => {
      toast.success("Группа удалена");
      void invalidateGroups();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении группы",
      );
    },
  });

  const addMetersMutation = useMutation({
    mutationFn: ({
      groupId,
      meterIds,
    }: {
      groupId: number;
      meterIds: number[];
    }) => addMetersToGroup(groupId, meterIds),
    onSuccess: (data) => {
      const message = (data as { message?: string })?.message || "";
      toast.success(message);
      void invalidateMeters();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при добавлении в группу",
      );
    },
  });

  const removeMetersMutation = useMutation({
    mutationFn: ({
      groupId,
      meterIds,
    }: {
      groupId: number;
      meterIds: number[];
    }) => removeMetersFromGroup(groupId, meterIds),
    onSuccess: (data) => {
      const message = (data as { message?: string })?.message || "";
      toast.success(message);
      void invalidateMeters();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении из группы",
      );
    },
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
