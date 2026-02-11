import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import type { AxiosError } from "axios";
import {
  createGroup,
  updateGroup,
  groupsKeys,
  type Group,
} from "@/entities/groups";
import { useFormReset, useToastMutation } from "@/shared/hooks";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { FormTextField } from "@/shared/ui/form-text-field";
import { FormActions } from "@/shared/ui/form-actions";
import { getApiErrorMessage } from "@/shared/helpers";
import { GroupFormSchema } from "../../model/schema";
import type { GroupFormValues } from "../../model/types";

interface Props {
  groupToEdit: Group | null;
  onClose: () => void;
}

export const GroupForm = ({ groupToEdit, onClose }: Props) => {
  const defaultValues = useMemo(
    () => ({
      name: groupToEdit?.name ?? "",
    }),
    [groupToEdit],
  );

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<GroupFormValues>({
    resolver: zodResolver(GroupFormSchema),
    defaultValues,
  });

  useFormReset(reset, defaultValues);

  const mutation = useToastMutation({
    mutationFn: ({
      groupId,
      name,
    }: {
      groupId?: number;
      name: string;
    }) => (groupId ? updateGroup(groupId, name) : createGroup(name)),
    invalidateKeys: [groupsKeys.all],
    successMessage: (_, variables) =>
      variables.groupId ? "Группа обновлена" : "Группа создана",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при сохранении группы"),
    onSuccess: () => {
      onClose();
    },
  });

  const onSubmit = (values: GroupFormValues) => {
    const name = values.name.trim();
    mutation.mutate({ groupId: groupToEdit?.id, name });
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
          label="Название группы"
          fullWidth
          name="name"
          control={control}
        />
      </FormFieldset>

      <FormActions
        isSubmitting={mutation.isPending}
        submitLabel={groupToEdit ? "Сохранить" : "Создать"}
      />
    </Box>
  );
};
