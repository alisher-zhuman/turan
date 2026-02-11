import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import {
  createCompany,
  editCompany,
  companiesKeys,
  type Company,
  type CompanyPayload,
} from "@/entities/companies";
import { useFormReset, useToastMutation } from "@/shared/hooks";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { FormTextField } from "@/shared/ui/form-text-field";
import { FormActions } from "@/shared/ui/form-actions";
import { getApiErrorMessage } from "@/shared/helpers";
import { CompanyFormSchema } from "../../model/schema";
import type { CompanyFormValues } from "../../model/types";

interface Props {
  company?: Company | null;
  onClose: () => void;
}

export const CompanyForm = ({ company, onClose }: Props) => {
  const isEditing = !!company;
  const defaultValues = useMemo(
    () => ({
      name: company?.name ?? "",
      address: company?.address ?? "",
    }),
    [company],
  );

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(CompanyFormSchema),
    defaultValues,
  });

  useFormReset(reset, defaultValues);

  const mutation = useToastMutation({
    mutationFn: (payload: CompanyPayload) =>
      isEditing ? editCompany(company!.id, payload) : createCompany(payload),
    invalidateKeys: [companiesKeys.all],
    successMessage: isEditing
      ? "Компания успешно обновлена"
      : "Компания успешно создана",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при сохранении компании"),
    onSuccess: () => {
      onClose();
    },
  });

  const onSubmit = (values: CompanyFormValues) => {
    mutation.mutate({
      name: values.name.trim(),
      address: values.address.trim(),
    });
  };

  const submitLabel = isEditing ? "Сохранить" : "Создать";
  const submitLabelLoading = isEditing ? "Обновление..." : "Создание...";

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <FormFieldset disabled={mutation.isPending}>
        <FormTextField
          label="Название компании"
          fullWidth
          required
          name="name"
          control={control}
        />

        <FormTextField
          label="Адрес"
          fullWidth
          required
          name="address"
          control={control}
        />
      </FormFieldset>

      <FormActions
        isSubmitting={mutation.isPending}
        submitLabel={submitLabel}
        submitLabelLoading={submitLabelLoading}
      />
    </Box>
  );
};
