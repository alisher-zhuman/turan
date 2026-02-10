import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup, updateGroup, type Group } from "@/entities/groups";
import { GroupFormSchema } from "../../model/schema";
import type { GroupFormValues } from "../../model/types";

interface Props {
  groupToEdit: Group | null;
  onClose: () => void;
}

export const GroupForm = ({ groupToEdit, onClose }: Props) => {
  const queryClient = useQueryClient();

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

  const mutation = useMutation({
    mutationFn: ({
      groupId,
      name,
    }: {
      groupId?: number;
      name: string;
    }) => (groupId ? updateGroup(groupId, name) : createGroup(name)),
    onSuccess: (_, variables) => {
      toast.success(variables.groupId ? "Группа обновлена" : "Группа создана");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      onClose();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при сохранении группы",
      );
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
      <TextField
        label="Название группы"
        {...register("name")}
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />

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
