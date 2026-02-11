// src/features/meters/ui/meter-form.tsx
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { updateMeter, type Meter } from "@/entities/meters";
import { useToastMutation } from "@/shared/hooks";
import { getApiErrorMessage } from "@/shared/helpers";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { FormCheckbox } from "@/shared/ui/form-checkbox";
import { FormTextField } from "@/shared/ui/form-text-field";
import { MeterFormSchema } from "../../model/schema";
import type { MeterFormValues } from "../../model/types";

interface Props {
  meterToEdit: Meter | null;
  onClose: () => void;
  canArchive: boolean;
}

export const MeterForm = ({ meterToEdit, onClose, canArchive }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
  } = useForm<MeterFormValues>({
    resolver: zodResolver(MeterFormSchema),
    defaultValues: {
      customerID: meterToEdit?.customerID ?? "",
      client: meterToEdit?.client ?? "",
      address: meterToEdit?.address ?? "",
      descriptions: meterToEdit?.descriptions ?? "",
      isArchived: meterToEdit?.isArchived ?? false,
    },
  });

  useEffect(() => {
    reset({
      customerID: meterToEdit?.customerID ?? "",
      client: meterToEdit?.client ?? "",
      address: meterToEdit?.address ?? "",
      descriptions: meterToEdit?.descriptions ?? "",
      isArchived: meterToEdit?.isArchived ?? false,
    });
  }, [meterToEdit, reset]);

  const mutation = useToastMutation({
    mutationFn: (payload: {
      meterId: number;
      customerID: string | null;
      client: string | null;
      address: string | null;
      descriptions: string | null;
      isArchived: boolean;
    }) => updateMeter(payload),
    invalidateKeys: [["meters"]],
    successMessage: "Счётчик обновлён",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при сохранении счётчика"),
    onSuccess: () => {
      onClose();
    },
  });

  const onSubmit = (values: MeterFormValues) => {
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
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <FormFieldset disabled={mutation.isPending}>
        <FormTextField
          label="ID Клиента"
          name="customerID"
          control={control}
        />

        <FormTextField
          label="Клиент"
          name="client"
          control={control}
        />

        <FormTextField
          label="Адрес"
          name="address"
          control={control}
        />

        <FormTextField
          label="Описание"
          multiline
          minRows={2}
          name="descriptions"
          control={control}
        />

        {canArchive && (
          <FormCheckbox
            name="isArchived"
            control={control}
            label="Отправить в архив"
          />
        )}
      </FormFieldset>

      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button
          type="submit"
          variant="contained"
          disabled={mutation.isPending}
        >
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};
