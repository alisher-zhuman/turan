import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import { updateMeter, metersKeys, type Meter } from "@/entities/meters";
import { useFormReset, useToastMutation } from "@/shared/hooks";
import { getApiErrorMessage } from "@/shared/helpers";
import { MeterFormSchema } from "../model/schema";
import type { MeterFormValues } from "../model/types";

interface Params {
  meterToEdit: Meter | null;
  onClose: () => void;
  canArchive: boolean;
}

const getDefaultValues = (meterToEdit: Meter | null): MeterFormValues => ({
  customerID: meterToEdit?.customerID ?? "",
  client: meterToEdit?.client ?? "",
  address: meterToEdit?.address ?? "",
  descriptions: meterToEdit?.descriptions ?? "",
  isArchived: meterToEdit?.isArchived ?? false,
});

export const useMeterForm = ({
  meterToEdit,
  onClose,
  canArchive,
}: Params) => {
  const defaultValues = useMemo(
    () => getDefaultValues(meterToEdit),
    [meterToEdit],
  );

  const { handleSubmit, control, reset } = useForm<MeterFormValues>({
    resolver: zodResolver(MeterFormSchema),
    defaultValues,
  });

  useFormReset(reset, defaultValues);

  const mutation = useToastMutation({
    mutationFn: (payload: {
      meterId: number;
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
    if (!meterToEdit) return;

    const normalizedCustomerID =
      values.customerID && values.customerID.trim().length > 0
        ? values.customerID.trim()
        : null;

    mutation.mutate({
      meterId: meterToEdit.id,
      customerID: normalizedCustomerID,
      client: values.client ?? "",
      address: values.address ?? "",
      descriptions: values.descriptions ?? "",
      isArchived: canArchive ? values.isArchived : meterToEdit.isArchived,
    });
  });

  return {
    control,
    onSubmit,
    isPending: mutation.isPending,
  };
};
