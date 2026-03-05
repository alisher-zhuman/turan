import type { AxiosError } from "axios";

import { deleteReadings, exportReadings, readingsKeys } from "@/entities/readings";

import { downloadBlobFile, getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

interface Params {
  isAdmin: boolean;
  onRemoved?: (ids: string[]) => void;
}

interface ExportParams {
  meterId: number | null;
  customerId: string;
  dateFrom: string;
  dateTo: string;
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

  const exportMutation = useToastMutation({
    mutationFn: ({ meterId, customerId, dateFrom, dateTo }: ExportParams) =>
      exportReadings({
        meterId,
        customerID: customerId,
        dateFrom,
        dateTo,
      }),
    successMessage: "Excel-файл выгружен",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при выгрузке показаний"),
    onSuccess: ({ blob, filename }) => {
      downloadBlobFile(blob, filename);
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

  const handleExportReadings = (params: ExportParams) => {
    if (!isAdmin) return;
    exportMutation.mutate(params);
  };

  return {
    handleDeleteOne,
    handleDeleteSelected,
    handleExportReadings,
    isExportingReadings: exportMutation.isPending,
  };
};
