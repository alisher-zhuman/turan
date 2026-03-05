import type { AxiosError } from "axios";

import {
  deleteMeters,
  downloadMetersTemplate,
  metersKeys,
  sendMeterCommand,
  uploadMetersFromFile,
} from "@/entities/meters";

import { downloadBlobFile, getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

interface Params {
  isAdmin: boolean;
  onRemoved?: (meterIds: number[]) => void;
}

export const useMeterActions = ({ isAdmin, onRemoved }: Params) => {
  const deleteMutation = useToastMutation({
    mutationFn: (meterIds: number[]) => deleteMeters(meterIds),
    invalidateKeys: [metersKeys.all],
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
      onRemoved?.(meterIds);
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
    invalidateKeys: [metersKeys.all],
    successMessage: (_, { command }) =>
      command === "open"
        ? "Команда на открытие клапана отправлена"
        : "Команда на закрытие клапана отправлена",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при отправке команды клапану"),
  });

  const downloadTemplateMutation = useToastMutation({
    mutationFn: downloadMetersTemplate,
    successMessage: "Шаблон Excel скачан",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при скачивании шаблона"),
    onSuccess: ({ blob, filename }) => {
      downloadBlobFile(blob, filename);
    },
  });

  const uploadMetersMutation = useToastMutation({
    mutationFn: (file: File) => uploadMetersFromFile(file),
    invalidateKeys: [metersKeys.all],
    successMessage: ({ message, addedCount, skippedCount }) =>
      message?.trim() ||
      `Загрузка завершена: добавлено ${addedCount}, пропущено ${skippedCount}`,
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при загрузке файла со счётчиками"),
  });

  const handleDeleteOne = (meterId: number) => {
    if (!isAdmin) return;
    deleteMutation.mutate([meterId]);
  };

  const handleDeleteSelected = (meterIds: number[]) => {
    if (!isAdmin || meterIds.length === 0) return;
    deleteMutation.mutate(meterIds);
  };

  const handleCommand = (meterId: number, command: "open" | "close") => {
    if (!isAdmin) return;
    commandMutation.mutate({ meterId, command });
  };

  const handleDownloadTemplate = () => {
    if (!isAdmin) return;
    downloadTemplateMutation.mutate();
  };

  const handleUploadFile = (file: File) => {
    if (!isAdmin) return;
    uploadMetersMutation.mutate(file);
  };

  return {
    handleDeleteOne,
    handleDeleteSelected,
    handleCommand,
    handleDownloadTemplate,
    handleUploadFile,
    isDownloadingTemplate: downloadTemplateMutation.isPending,
    isUploadingFile: uploadMetersMutation.isPending,
  };
};
