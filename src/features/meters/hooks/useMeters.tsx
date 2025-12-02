import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { Meter } from "@/features/meters/interfaces";
import { useAuthStore } from "@/features/authentication/store/auth";
import {
  getMeters,
  deleteMeters,
  sendMeterCommand,
} from "@/features/meters/api";

export const useMeters = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState<string>("all");
  const [isArchived, setIsArchived] = useState(false);
  const [groupId, setGroupId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [valveFilter, setValveFilter] = useState<"all" | "open" | "closed">(
    "all"
  );

  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  const isAdmin = user?.role === "admin";
  const canEdit = user?.role === "admin" || user?.role === "controller";
  const canManageMetersToGroups =
    user?.role === "admin" ||
    user?.role === "controller" ||
    user?.role === "user";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["meters", page, limit, status, isArchived, groupId],
    queryFn: () => getMeters(page + 1, limit, isArchived, status, groupId),
    staleTime: 5000,
  });

  const metersRaw: Meter[] = data?.data ?? [];
  const meters: Meter[] = metersRaw.filter((m) => {
    if (valveFilter === "all") {
      return true;
    }
    if (valveFilter === "open") {
      return m.valveStatus === "open";
    }
    if (valveFilter === "closed") {
      return m.valveStatus === "closed";
    }
    return true;
  });

  const hasMeters = meters.length > 0;
  const emptyText = "Счётчики не найдены";
  const total = data?.total;

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ["meters"] });
  };

  const handleDeleteOne = async (meterId: number) => {
    if (!isAdmin) return;

    try {
      await deleteMeters([meterId]);
      toast.success("Счётчик удалён");
      setSelectedIds((prev) => prev.filter((id) => id !== meterId));
      await invalidate();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении счётчика"
      );
    }
  };

  const handleDeleteSelected = async () => {
    if (!isAdmin || selectedIds.length === 0) return;

    try {
      await deleteMeters(selectedIds);
      toast.success("Выбранные счётчики удалены");
      setSelectedIds([]);
      await invalidate();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при удалении выбранных счётчиков"
      );
    }
  };

  const handleCommand = async (meterId: number, command: "open" | "close") => {
    if (!isAdmin) return;

    try {
      await sendMeterCommand(meterId, command);
      toast.success(
        command === "open"
          ? "Команда на открытие клапана отправлена"
          : "Команда на закрытие клапана отправлена"
      );
      await invalidate();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при отправке команды клапану"
      );
    }
  };

  const allSelected =
    isAdmin && hasMeters && selectedIds.length === meters.length;
  const isIndeterminate = isAdmin && selectedIds.length > 0 && !allSelected;

  const handleToggleAll = (checked: boolean) => {
    if (!isAdmin) return;

    setSelectedIds(checked ? meters.map((m) => m.id) : []);
  };

  const handleToggleOne = (id: number) => {
    if (!isAdmin) return;

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setStatus("all");
    setValveFilter("all");
    setIsArchived(false);
    setGroupId(null);
    setPage(0);
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  return {
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,

    page,
    limit,
    setPage,
    setLimit,

    status,
    setStatus,
    isArchived,
    setIsArchived,

    valveFilter,
    setValveFilter,

    groupId,
    setGroupId,

    isAdmin,
    canEdit,
    canManageMetersToGroups,

    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,
    handleDeleteOne,
    handleDeleteSelected,
    handleCommand,
    handleResetFilters,
    clearSelection,
  };
};
