import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { AxiosError } from "axios";
import { createGroup, updateGroup, type Group } from "@/entities/groups";
import { useToastMutation } from "@/shared/hooks";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { FormTextField } from "@/shared/ui/form-text-field";
import { getApiErrorMessage } from "@/shared/helpers";
import { GroupFormSchema } from "../../model/schema";
import type { GroupFormValues } from "../../model/types";

interface Props {
  groupToEdit: Group | null;
  onClose: () => void;
}

export const GroupForm = ({ groupToEdit, onClose }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<GroupFormValues>({
    resolver: zodResolver(GroupFormSchema),
    defaultValues: {
      name: groupToEdit?.name ?? "",
    },
  });

  useEffect(() => {
    reset({
      name: groupToEdit?.name ?? "",
    });
  }, [groupToEdit, reset]);

  const mutation = useToastMutation({
    mutationFn: ({
      groupId,
      name,
    }: {
      groupId?: number;
      name: string;
    }) => (groupId ? updateGroup(groupId, name) : createGroup(name)),
    invalidateKeys: [["groups"]],
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

      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button
          type="submit"
          variant="contained"
          disabled={mutation.isPending}
        >
          {groupToEdit ? "Сохранить" : "Создать"}
        </Button>
      </Box>
    </Box>
  );
};
