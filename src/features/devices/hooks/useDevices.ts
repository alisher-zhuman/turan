import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { deleteDevice, getDevices, verifyDevice, type Device } from "@/entities/devices";

export const useDevices = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [verified, setVerified] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const queryClient = useQueryClient();

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

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["devices"] });

  const verifyMutation = useMutation({
    mutationFn: (deviceId: number) => verifyDevice(deviceId),
    onSuccess: () => {
      toast.success("Устройство подтверждено");
      void invalidate();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при подтверждении устройства",
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (deviceIds: number[]) => deleteDevice(deviceIds),
    onSuccess: (_, deviceIds) => {
      toast.success(
        deviceIds.length === 1
          ? "Устройство удалено"
          : "Выбранные устройства удалены",
      );
      setSelectedIds((prev) =>
        prev.filter((id) => !deviceIds.includes(id)),
      );
      void invalidate();
    },
    onError: (error, deviceIds) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          (deviceIds.length === 1
            ? "Ошибка при удалении устройства"
            : "Ошибка при удалении выбранных устройств"),
      );
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
