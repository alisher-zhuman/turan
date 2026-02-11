import type { AxiosError } from "axios";
import { deleteMeters, sendMeterCommand } from "@/entities/meters";
import { useToastMutation } from "@/shared/hooks";
import { getApiErrorMessage } from "@/shared/helpers";

interface Params {
  isAdmin: boolean;
  onRemoved?: (meterIds: number[]) => void;
}

export const useMeterActions = ({ isAdmin, onRemoved }: Params) => {
  const deleteMutation = useToastMutation({
    mutationFn: (meterIds: number[]) => deleteMeters(meterIds),
    invalidateKeys: [["meters"]],
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
    invalidateKeys: [["meters"]],
    successMessage: (_, { command }) =>
      command === "open"
        ? "Команда на открытие клапана отправлена"
        : "Команда на закрытие клапана отправлена",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при отправке команды клапану"),
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

  return {
    handleDeleteOne,
    handleDeleteSelected,
    handleCommand,
  };
};
