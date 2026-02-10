import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { AxiosError } from "axios";
import { createGroup, updateGroup, type Group } from "@/entities/groups";
import { useToastMutation } from "@/shared/hooks";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { GroupFormSchema } from "../../model/schema";
import type { GroupFormValues } from "../../model/types";

interface Props {
  groupToEdit: Group | null;
  onClose: () => void;
}

export const GroupForm = ({ groupToEdit, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
      error.response?.data?.message || "Ошибка при сохранении группы",
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
        <TextField
          label="Название группы"
          {...register("name")}
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
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
