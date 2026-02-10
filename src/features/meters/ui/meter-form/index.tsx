// src/features/meters/ui/meter-form.tsx
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { updateMeter, type Meter } from "@/entities/meters";
import { MeterFormSchema } from "../../model/schema";
import type { MeterFormValues } from "../../model/types";

interface Props {
  meterToEdit: Meter | null;
  onClose: () => void;
  canArchive: boolean;
}

export const MeterForm = ({ meterToEdit, onClose, canArchive }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
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

  const mutation = useMutation({
    mutationFn: (payload: {
      meterId: number;
      customerID: string | null;
      client: string | null;
      address: string | null;
      descriptions: string | null;
      isArchived: boolean;
    }) => updateMeter(payload),
    onSuccess: () => {
      toast.success("Счётчик обновлён");
      queryClient.invalidateQueries({ queryKey: ["meters"] });
      onClose();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при сохранении счётчика",
      );
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
      <TextField
        label="ID Клиента"
        {...register("customerID")}
      />

      <TextField
        label="Клиент"
        {...register("client")}
      />

      <TextField
        label="Адрес"
        {...register("address")}
      />

      <TextField
        label="Описание"
        {...register("descriptions")}
        multiline
        minRows={2}
      />

      {canArchive && (
        <FormControlLabel
          control={
            <Controller
              name="isArchived"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          }
          label="Отправить в архив"
        />
      )}

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
