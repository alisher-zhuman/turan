import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  deleteDevice,
  getDevices,
  verifyDevice,
  type Device,
} from "@/entities/devices";
import { useToastMutation } from "@/shared/hooks";

export const useDevices = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [verified, setVerified] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["devices", page, limit, verified],
    queryFn: () => getDevices(page + 1, limit, verified),
    staleTime: 5000,
  });

  const devices: Device[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const hasDevices = devices.length > 0;

  const emptyText = verified
    ? "Нет подтверждённых устройств"
    : "Нет неподтверждённых устройств";

  const verifyMutation = useToastMutation({
    mutationFn: (deviceId: number) => verifyDevice(deviceId),
    invalidateKeys: [["devices"]],
    successMessage: "Устройство подтверждено",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      error.response?.data?.message || "Ошибка при подтверждении устройства",
  });

  const deleteMutation = useToastMutation({
    mutationFn: (deviceIds: number[]) => deleteDevice(deviceIds),
    invalidateKeys: [["devices"]],
    successMessage: (_, deviceIds) =>
      deviceIds.length === 1
        ? "Устройство удалено"
        : "Выбранные устройства удалены",
    errorMessage: (error: AxiosError<{ message?: string }>, deviceIds) =>
      error.response?.data?.message ||
      (deviceIds.length === 1
        ? "Ошибка при удалении устройства"
        : "Ошибка при удалении выбранных устройств"),
    onSuccess: (_, deviceIds) => {
      setSelectedIds((prev) => prev.filter((id) => !deviceIds.includes(id)));
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

  const allSelected = hasDevices && selectedIds.length === devices.length;
  const isIndeterminate = selectedIds.length > 0 && !allSelected;

  useEffect(() => {
    setSelectedIds([]);
  }, [page, limit, verified]);

  const handleToggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(devices.map((d) => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
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
