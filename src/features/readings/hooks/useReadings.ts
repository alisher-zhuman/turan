import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { deleteReadings, getReadings, type Reading } from "@/entities/readings";
import { useAuthStore } from "@/shared/stores";
import { usePagination, useSelection, useToastMutation } from "@/shared/hooks";
import { getApiErrorMessage, hasRoleAdmin } from "@/shared/helpers";

export const useReadings = () => {
  const user = useAuthStore((state) => state.user);

  const { page, limit, setPage, setLimit } = usePagination({});

  const isAdmin = hasRoleAdmin(user?.role);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["readings", page, limit],
    queryFn: () => getReadings(page + 1, limit),
  });

  const readings: Reading[] = data?.data ?? [];
  const hasReadings = readings.length > 0;
  const total = data?.total ?? 0;
  const emptyText = "Показания не найдены";

  const {
    selectedIds,
    allSelected,
    isIndeterminate,
    toggleAll,
    toggleOne,
    removeSelected,
  } = useSelection<Reading, string>({
    items: readings,
    getId: (reading) => reading.id,
    enabled: isAdmin,
    resetKey: [page, limit].join("|"),
  });

  const deleteMutation = useToastMutation({
    mutationFn: (ids: string[]) => deleteReadings(ids),
    invalidateKeys: [["readings"]],
    successMessage: (_, ids) =>
      ids.length === 1 ? "Показание удалено" : "Выбранные показания удалены",
    errorMessage: (error: AxiosError<{ message?: string }>, ids) =>
      getApiErrorMessage(
        error,
        ids.length === 1
          ? "Ошибка при удалении показания"
          : "Ошибка при удалении выбранных показаний",
      ),
    onSuccess: (_, ids) => {
      removeSelected(ids);
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

  const handleToggleAll = (checked: boolean) => {
    toggleAll(checked);
  };

  const handleToggleOne = (id: string) => {
    toggleOne(id);
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
