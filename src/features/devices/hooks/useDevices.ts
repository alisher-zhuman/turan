import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  deleteDevice,
  getDevices,
  verifyDevice,
  type Device,
} from "@/entities/devices";
import { usePagination, useSelection, useToastMutation } from "@/shared/hooks";
import { getApiErrorMessage } from "@/shared/helpers";

export const useDevices = () => {
  const [verified, setVerified] = useState(false);

  const { page, limit, setPage, setLimit } = usePagination({
    resetKey: verified ? "verified" : "unverified",
  });

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["devices", page, limit, verified],
    queryFn: () => getDevices(page + 1, limit, verified),
  });

  const devices: Device[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const hasDevices = devices.length > 0;

  const emptyText = verified
    ? "Нет подтверждённых устройств"
    : "Нет неподтверждённых устройств";

  const {
    selectedIds,
    allSelected,
    isIndeterminate,
    toggleAll,
    toggleOne,
    removeSelected,
  } = useSelection<Device, number>({
    items: devices,
    getId: (device) => device.id,
    resetKey: [page, limit, verified].join("|"),
  });

  const verifyMutation = useToastMutation({
    mutationFn: (deviceId: number) => verifyDevice(deviceId),
    invalidateKeys: [["devices"]],
    successMessage: "Устройство подтверждено",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при подтверждении устройства"),
  });

  const deleteMutation = useToastMutation({
    mutationFn: (deviceIds: number[]) => deleteDevice(deviceIds),
    invalidateKeys: [["devices"]],
    successMessage: (_, deviceIds) =>
      deviceIds.length === 1
        ? "Устройство удалено"
        : "Выбранные устройства удалены",
    errorMessage: (error: AxiosError<{ message?: string }>, deviceIds) =>
      getApiErrorMessage(
        error,
        deviceIds.length === 1
          ? "Ошибка при удалении устройства"
          : "Ошибка при удалении выбранных устройств",
      ),
    onSuccess: (_, deviceIds) => {
      removeSelected(deviceIds);
    },
  });

  const handleVerify = (deviceId: number) => {
    verifyMutation.mutate(deviceId);
  };

  const handleDeleteOne = (deviceId: number) => {
    deleteMutation.mutate([deviceId]);
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    deleteMutation.mutate(selectedIds);
  };

  const handleToggleAll = (checked: boolean) => {
    toggleAll(checked);
  };

  const handleToggleOne = (id: number) => {
    toggleOne(id);
  };

  return {
    devices,
    total,
    hasDevices,
    emptyText,
    isLoading,
    isError,
    isFetching,

    page,
    limit,
    setPage,
    setLimit,

    verified,
    setVerified,

    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,

    handleVerify,
    handleDeleteOne,
    handleDeleteSelected,
  };
};
