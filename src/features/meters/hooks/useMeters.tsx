import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  deleteMeters,
  getMeters,
  sendMeterCommand,
  type Meter,
} from "@/entities/meters";
import { useToastMutation } from "@/shared/hooks";
import {
  canEditMeters,
  canManageMetersToGroups as canManageMetersToGroupsRole,
  hasRoleAdmin,
} from "@/shared/helpers";
import { useAuthStore } from "@/shared/stores";

export const useMeters = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [meterName, setMeterName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [isArchived, setIsArchived] = useState(false);
  const [groupId, setGroupId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [valveFilter, setValveFilter] = useState<"all" | "open" | "closed">(
    "all",
  );

  const user = useAuthStore((state) => state.user);

  const isAdmin = hasRoleAdmin(user?.role);
  const canEdit = canEditMeters(user?.role);
  const canManageMetersToGroups = canManageMetersToGroupsRole(user?.role);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [
      "meters",
      page,
      limit,
      status,
      isArchived,
      groupId,
      customerId,
      meterName,
    ],
    queryFn: () =>
      getMeters(
        page + 1,
        limit,
        isArchived,
        status,
        groupId,
        customerId,
        meterName,
      ),
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
  const total = data?.total ?? 0;

  const deleteMutation = useToastMutation({
    mutationFn: (meterIds: number[]) => deleteMeters(meterIds),
    invalidateKeys: [["meters"]],
    successMessage: (_, meterIds) =>
      meterIds.length === 1
        ? "Счётчик удалён"
        : "Выбранные счётчики удалены",
    errorMessage: (error: AxiosError<{ message?: string }>, meterIds) =>
      error.response?.data?.message ||
      (meterIds.length === 1
        ? "Ошибка при удалении счётчика"
        : "Ошибка при удалении выбранных счётчиков"),
    onSuccess: (_, meterIds) => {
      setSelectedIds((prev) => prev.filter((id) => !meterIds.includes(id)));
    },
  });

  const commandMutation = useToastMutation({
    mutationFn: ({
      meterId,
      command,
    }: {
      meterId: number;
      command: "open" | "close";
    }) => sendMeterCommand(meterId, command),
    invalidateKeys: [["meters"]],
    successMessage: (_, { command }) =>
      command === "open"
        ? "Команда на открытие клапана отправлена"
        : "Команда на закрытие клапана отправлена",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      error.response?.data?.message ||
      "Ошибка при отправке команды клапану",
  });

  const handleDeleteOne = (meterId: number) => {
    if (!isAdmin) return;
    deleteMutation.mutate([meterId]);
  };

  const handleDeleteSelected = () => {
    if (!isAdmin || selectedIds.length === 0) return;
    deleteMutation.mutate(selectedIds);
  };

  const handleCommand = (meterId: number, command: "open" | "close") => {
    if (!isAdmin) return;
    commandMutation.mutate({ meterId, command });
  };

  const allSelected =
    canManageMetersToGroups &&
    hasMeters &&
    selectedIds.length === meters.length;
  const isIndeterminate =
    canManageMetersToGroups && selectedIds.length > 0 && !allSelected;

  useEffect(() => {
    setSelectedIds([]);
  }, [
    page,
    limit,
    status,
    isArchived,
    groupId,
    customerId,
    meterName,
    valveFilter,
  ]);

  const handleToggleAll = (checked: boolean) => {
    if (!canManageMetersToGroups) return;

    setSelectedIds(checked ? meters.map((m) => m.id) : []);
  };

  const handleToggleOne = (id: number) => {
    if (!canManageMetersToGroups) return;

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleResetFilters = () => {
    setStatus("all");
    setValveFilter("all");
    setIsArchived(false);
    setGroupId(null);
    setCustomerId("");
    setMeterName("");
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
    isFetching,

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

    customerId,
    setCustomerId,
    meterName,
    setMeterName,

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
