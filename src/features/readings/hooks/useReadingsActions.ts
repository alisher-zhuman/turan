import type { AxiosError } from "axios";

import { deleteReadings, readingsKeys } from "@/entities/readings";

import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

interface Params {
  isAdmin: boolean;
  onRemoved?: (ids: string[]) => void;
}

export const useReadingsActions = ({ isAdmin, onRemoved }: Params) => {
  const deleteMutation = useToastMutation({
    mutationFn: (ids: string[]) => deleteReadings(ids),
    invalidateKeys: [readingsKeys.all],
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
      onRemoved?.(ids);
    },
  });

  const handleDeleteOne = (id: string) => {
    if (!isAdmin) return;
    deleteMutation.mutate([id]);
  };

  const handleDeleteSelected = (ids: string[]) => {
    if (!isAdmin || ids.length === 0) return;
    deleteMutation.mutate(ids);
  };

  return {
    handleDeleteOne,
    handleDeleteSelected,
  };
};
