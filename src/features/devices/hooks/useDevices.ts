import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { getDevices, verifyDevice, deleteDevice } from "@/features/devices/api";
import type { Device } from "@/features/devices/interfaces";

export const useDevices = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [verified, setVerified] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
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

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ["devices"] });
  };

  const handleVerify = async (deviceId: number) => {
    try {
      await verifyDevice(deviceId);
      toast.success("Устройство подтверждено");
      await invalidate();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при подтверждении устройства"
      );
    }
  };

  const handleDeleteOne = async (deviceId: number) => {
    try {
      await deleteDevice([deviceId]);
      toast.success("Устройство удалено");
      setSelectedIds((prev) => prev.filter((id) => id !== deviceId));
      await invalidate();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении устройства"
      );
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    try {
      await deleteDevice(selectedIds);
      toast.success("Выбранные устройства удалены");
      setSelectedIds([]);
      await invalidate();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при удалении выбранных устройств"
      );
    }
  };

  const allSelected = hasDevices && selectedIds.length === devices.length;
  const isIndeterminate = selectedIds.length > 0 && !allSelected;

  const handleToggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(devices.map((d) => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return {
    devices,
    total,
    hasDevices,
    emptyText,
    isLoading,
    isError,

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
