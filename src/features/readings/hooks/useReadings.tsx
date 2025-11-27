import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { getReadings, deleteReadings } from "@/features/readings/api";
import type { Reading } from "@/features/readings/interfaces";
import { useAuthStore } from "@/features/authentication/store/auth";

export const useReadings = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  const isAdmin = user?.role === "admin";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["readings", page, limit],
    queryFn: () => getReadings(page + 1, limit),
    staleTime: 5000,
  });

  const readings: Reading[] = data?.data ?? [];
  const hasReadings = readings.length > 0;
  const total = data?.total;
  const emptyText = "Показания не найдены";

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ["readings"] });
  };

  const handleDeleteOne = async (id: string) => {
    if (!isAdmin) return;

    try {
      await deleteReadings([id]);
      toast.success("Показание удалено");
      setSelectedIds((prev) => prev.filter((x) => x !== id));
      await invalidate();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении показания"
      );
    }
  };

  const handleDeleteSelected = async () => {
    if (!isAdmin || selectedIds.length === 0) return;

    try {
      await deleteReadings(selectedIds);
      toast.success("Выбранные показания удалены");
      setSelectedIds([]);
      await invalidate();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при удалении выбранных показаний"
      );
    }
  };

  const allSelected =
    isAdmin && hasReadings && selectedIds.length === readings.length;
  const isIndeterminate = isAdmin && selectedIds.length > 0 && !allSelected;

  const handleToggleAll = (checked: boolean) => {
    if (!isAdmin) return;
    if (checked) {
      setSelectedIds(readings.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleOne = (id: string) => {
    if (!isAdmin) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return {
    readings,
    total,
    hasReadings,
    emptyText,
    isLoading,
    isError,

    page,
    limit,
    setPage,
    setLimit,

    isAdmin,

    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,

    handleDeleteOne,
    handleDeleteSelected,
  };
};
