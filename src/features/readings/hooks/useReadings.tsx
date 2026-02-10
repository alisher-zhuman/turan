import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { deleteReadings, getReadings, type Reading } from "@/entities/readings";
import { useAuthStore } from "@/shared/stores";
import { hasRoleAdmin } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

export const useReadings = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const user = useAuthStore((state) => state.user);

  const isAdmin = hasRoleAdmin(user?.role);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["readings", page, limit],
    queryFn: () => getReadings(page + 1, limit),
    staleTime: 5000,
  });

  const readings: Reading[] = data?.data ?? [];
  const hasReadings = readings.length > 0;
  const total = data?.total ?? 0;
  const emptyText = "Показания не найдены";

  const deleteMutation = useToastMutation({
    mutationFn: (ids: string[]) => deleteReadings(ids),
    invalidateKeys: [["readings"]],
    successMessage: (_, ids) =>
      ids.length === 1
        ? "Показание удалено"
        : "Выбранные показания удалены",
    errorMessage: (error: AxiosError<{ message?: string }>, ids) =>
      error.response?.data?.message ||
      (ids.length === 1
        ? "Ошибка при удалении показания"
        : "Ошибка при удалении выбранных показаний"),
    onSuccess: (_, ids) => {
      setSelectedIds((prev) => prev.filter((x) => !ids.includes(x)));
    },
  });

  const handleDeleteOne = (id: string) => {
    if (!isAdmin) return;
    deleteMutation.mutate([id]);
  };

  const handleDeleteSelected = () => {
    if (!isAdmin || selectedIds.length === 0) return;
    deleteMutation.mutate(selectedIds);
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
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return {
    readings,
    total,
    hasReadings,
    emptyText,
    isLoading,
    isError,
    isFetching,

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
