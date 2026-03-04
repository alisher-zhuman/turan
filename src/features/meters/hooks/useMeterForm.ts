import { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";

import {
  createMeter,
  type Meter,
  metersKeys,
  updateMeter,
} from "@/entities/meters";

import { getApiErrorMessage } from "@/shared/helpers";
import { useFormReset, useToastMutation } from "@/shared/hooks";

import { MeterFormSchema } from "../schemas";
import type { MeterFormValues } from "../types";

interface Params {
  meterToEdit: Meter | null;
  onClose: () => void;
  canArchive: boolean;
}

const getDefaultValues = (meterToEdit: Meter | null): MeterFormValues => ({
  meterId: meterToEdit?.name ?? "",
  password: "",
  customerID: meterToEdit?.customerID ?? "",
  client: meterToEdit?.client ?? "",
  address: meterToEdit?.address ?? "",
  descriptions: meterToEdit?.descriptions ?? "",
  isArchived: meterToEdit?.isArchived ?? false,
});

const normalizeOptionalString = (value?: string) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

export const useMeterForm = ({
  meterToEdit,
  onClose,
  canArchive,
}: Params) => {
  const isEditing = Boolean(meterToEdit);

  const defaultValues = useMemo(
    () => getDefaultValues(meterToEdit),
    [meterToEdit],
  );

  const { handleSubmit, control, reset } = useForm<MeterFormValues>({
    resolver: zodResolver(MeterFormSchema),
    defaultValues,
  });

  useFormReset(reset, defaultValues);

  const createMutation = useToastMutation({
    mutationFn: (payload: {
      meterId: string;
      customerID?: string | null;
      client?: string | null;
      address?: string | null;
      descriptions?: string | null;
      password?: string | null;
    }) => createMeter(payload),
    invalidateKeys: [metersKeys.all],
    successMessage: "Счётчик создан",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при создании счётчика"),
    onSuccess: () => {
      onClose();
    },
  });

  const updateMutation = useToastMutation({
    mutationFn: (payload: {
      id: number;
      meterId: string;
      customerID: string | null;
      client: string | null;
      address: string | null;
      descriptions: string | null;
      isArchived: boolean;
    }) => updateMeter(payload),
    invalidateKeys: [metersKeys.all],
    successMessage: "Счётчик обновлён",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при сохранении счётчика"),
    onSuccess: () => {
      onClose();
    },
  });

  const onSubmit = handleSubmit((values) => {
    const normalizedMeterId = values.meterId.trim();
    const normalizedCustomerID = normalizeOptionalString(values.customerID);
    const normalizedClient = normalizeOptionalString(values.client);
    const normalizedAddress = normalizeOptionalString(values.address);
    const normalizedDescriptions = normalizeOptionalString(values.descriptions);

    if (!meterToEdit) {
      createMutation.mutate({
        meterId: normalizedMeterId,
        customerID: normalizedCustomerID,
        client: normalizedClient,
        address: normalizedAddress,
        descriptions: normalizedDescriptions,
        password: normalizeOptionalString(values.password),
      });
      return;
    }

    updateMutation.mutate({
      id: meterToEdit.id,
      meterId: normalizedMeterId,
      customerID: normalizedCustomerID,
      client: normalizedClient ?? "",
      address: normalizedAddress ?? "",
      descriptions: normalizedDescriptions ?? "",
      isArchived: canArchive ? values.isArchived : meterToEdit.isArchived,
    });
  });

  return {
    control,
    onSubmit,
    isPending: createMutation.isPending || updateMutation.isPending,
    isEditing,
  };
};
