import type { AxiosError } from "axios";
import { deleteDevice, verifyDevice } from "@/entities/devices";
import { useToastMutation } from "@/shared/hooks";
import { getApiErrorMessage } from "@/shared/helpers";

interface Params {
  onRemoved?: (deviceIds: number[]) => void;
}

export const useDeviceActions = ({ onRemoved }: Params) => {
  const verifyMutation = useToastMutation({
    mutationFn: (deviceId: number) => verifyDevice(deviceId),
    invalidateKeys: [["devices"]],
    successMessage: "Устройство подтверждено",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при подтверждении устройства"),
  });

  const deleteMutation = useToastMutation({
    mutationFn: (deviceIds: number[]) => deleteDevice(deviceIds),
    invalidateKeys: [["devices"]],
    successMessage: (_, deviceIds) =>
      deviceIds.length === 1
        ? "Устройство удалено"
        : "Выбранные устройства удалены",
    errorMessage: (error: AxiosError<{ message?: string }>, deviceIds) =>
      getApiErrorMessage(
        error,
        deviceIds.length === 1
          ? "Ошибка при удалении устройства"
          : "Ошибка при удалении выбранных устройств",
      ),
    onSuccess: (_, deviceIds) => {
      onRemoved?.(deviceIds);
    },
  });

  const handleVerify = (deviceId: number) => {
    verifyMutation.mutate(deviceId);
  };

  const handleDeleteOne = (deviceId: number) => {
    deleteMutation.mutate([deviceId]);
  };

  const handleDeleteSelected = (deviceIds: number[]) => {
    if (deviceIds.length === 0) return;
    deleteMutation.mutate(deviceIds);
  };

  return {
    handleVerify,
    handleDeleteOne,
    handleDeleteSelected,
  };
};
