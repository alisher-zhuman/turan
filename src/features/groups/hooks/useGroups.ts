import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

  const invalidateGroups = async () => {
    await queryClient.invalidateQueries({ queryKey: ["groups"] });
  };

  const invalidateMeters = async () => {
    await queryClient.invalidateQueries({ queryKey: ["meters"] });
  };

  const handleDelete = async (groupId: number) => {
    if (!isAdmin) return;

    try {
      await deleteGroup(groupId);
      toast.success("Группа удалена");
      await invalidateGroups();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении группы",
      );
    }
  };

  const handleAddMetersToGroup = async (
    groupId: number,
    meterIds: number[],
  ) => {
    if (!canManageMetersToGroups) return;

    try {
      const data = await addMetersToGroup(groupId, meterIds);

      const message = (data as { message?: string })?.message || "";

      toast.success(message);
      await invalidateMeters();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при добавлении в группу",
      );
    }
  };

  const handleRemoveMetersFromGroup = async (
    groupId: number,
    meterIds: number[],
  ) => {
    if (!canManageMetersToGroups) return;

    try {
      const data = await removeMetersFromGroup(groupId, meterIds);

      const message = (data as { message?: string })?.message || "";

      toast.success(message);
      await invalidateMeters();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении из группы",
      );
    }
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
