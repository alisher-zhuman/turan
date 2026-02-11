import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  deleteMeters,
  getMeters,
  sendMeterCommand,
  type Meter,
} from "@/entities/meters";
import { usePagination, useSelection, useToastMutation } from "@/shared/hooks";
import {
  getApiErrorMessage,
  canEditMeters,
  canManageMetersToGroups as canManageMetersToGroupsRole,
  hasRoleAdmin,
} from "@/shared/helpers";
import { useAuthStore } from "@/shared/stores";

type MeterFilters = {
  meterName: string;
  customerId: string;
  status: string;
  isArchived: boolean;
  groupId: number | null;
  valveFilter: "all" | "open" | "closed";
};

export const useMeters = () => {
  const [filters, setFilters] = useState<MeterFilters>({
    meterName: "",
    customerId: "",
    status: "all" as string,
    isArchived: false,
    groupId: null as number | null,
    valveFilter: "all" as "all" | "open" | "closed",
  });

  const filtersKey = [
    filters.status,
    filters.isArchived ? "archived" : "active",
    filters.groupId ?? "null",
    filters.customerId,
    filters.meterName,
    filters.valveFilter,
  ].join("|");

  const { page, limit, setPage, setLimit } = usePagination({
    resetKey: filtersKey,
  });

  const user = useAuthStore((state) => state.user);

  const isAdmin = hasRoleAdmin(user?.role);
  const canEdit = canEditMeters(user?.role);
  const canManageMetersToGroups = canManageMetersToGroupsRole(user?.role);

  const {
    meterName,
    customerId,
    status,
    isArchived,
    groupId,
    valveFilter,
  } = filters;

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

  const {
    selectedIds,
    allSelected,
    isIndeterminate,
    toggleAll,
    toggleOne,
    clearSelection,
    removeSelected,
  } = useSelection<Meter, number>({
    items: meters,
    getId: (meter) => meter.id,
    enabled: canManageMetersToGroups,
    resetKey: [page, limit, filtersKey].join("|"),
  });

  const updateFilters = (patch: Partial<MeterFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const setStatus = (value: string) => updateFilters({ status: value });
  const setIsArchived = (value: boolean) => updateFilters({ isArchived: value });
  const setGroupId = (value: number | null) => updateFilters({ groupId: value });
  const setCustomerId = (value: string) => updateFilters({ customerId: value });
  const setMeterName = (value: string) => updateFilters({ meterName: value });
  const setValveFilter = (value: "all" | "open" | "closed") =>
    updateFilters({ valveFilter: value });

  const deleteMutation = useToastMutation({
    mutationFn: (meterIds: number[]) => deleteMeters(meterIds),
    invalidateKeys: [["meters"]],
    successMessage: (_, meterIds) =>
      meterIds.length === 1
        ? "Счётчик удалён"
        : "Выбранные счётчики удалены",
    errorMessage: (error: AxiosError<{ message?: string }>, meterIds) =>
      getApiErrorMessage(
        error,
        meterIds.length === 1
          ? "Ошибка при удалении счётчика"
          : "Ошибка при удалении выбранных счётчиков",
      ),
    onSuccess: (_, meterIds) => {
      removeSelected(meterIds);
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
      getApiErrorMessage(error, "Ошибка при отправке команды клапану"),
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

  const handleToggleAll = (checked: boolean) => {
    toggleAll(checked);
  };

  const handleToggleOne = (id: number) => {
    toggleOne(id);
  };

  const handleResetFilters = () => {
    setFilters({
      meterName: "",
      customerId: "",
      status: "all",
      isArchived: false,
      groupId: null,
      valveFilter: "all",
    });
    setPage(0);
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
