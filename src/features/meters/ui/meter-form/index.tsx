// src/features/meters/ui/meter-form.tsx
import Box from "@mui/material/Box";

import type { Meter } from "@/entities/meters";

import { FormActions } from "@/shared/ui/form-actions";
import { FormCheckbox } from "@/shared/ui/form-checkbox";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { FormTextField } from "@/shared/ui/form-text-field";

import { useMeterForm } from "../../hooks/useMeterForm";

interface Props {
  meterToEdit: Meter | null;
  onClose: () => void;
  canArchive: boolean;
}

export const MeterForm = ({ meterToEdit, onClose, canArchive }: Props) => {
  const { control, onSubmit, isPending, isEditing } = useMeterForm({
    meterToEdit,
    onClose,
    canArchive,
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <FormFieldset disabled={isPending}>
        <FormTextField
          label="Номер водомера"
          name="meterId"
          required
          control={control}
        />

        {!isEditing && (
          <FormTextField label="Пароль" name="password" control={control} />
        )}

        <FormTextField
          label="Лицевой счет"
          name="customerID"
          control={control}
        />

        <FormTextField label="ФИО" name="client" control={control} />

        <FormTextField label="Адрес" name="address" control={control} />

        <FormTextField
          label="Описание"
          multiline
          minRows={2}
          name="descriptions"
          control={control}
        />

        {isEditing && canArchive && (
          <FormCheckbox
            name="isArchived"
            control={control}
            label="Отправить в архив"
          />
        )}
      </FormFieldset>

      <FormActions
        isSubmitting={isPending}
        submitLabel={isEditing ? "Сохранить" : "Создать"}
        submitLabelLoading={isEditing ? "Сохранение..." : "Создание..."}
      />
    </Box>
  );
};
