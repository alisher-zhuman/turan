import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createWebhook } from "@/entities/webhooks";
import { useToastMutation } from "@/shared/hooks";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { WebhookFormSchema } from "../../model/schema";
import type { WebhookFormValues } from "../../model/types";

interface Props {
  onClose: () => void;
}

export const WebhookForm = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WebhookFormValues>({
    resolver: zodResolver(WebhookFormSchema),
    defaultValues: {
      url: "",
    },
  });

  const mutation = useToastMutation({
    mutationFn: (url: string) => createWebhook(url),
    invalidateKeys: [["webhooks"]],
    successMessage: "Вебхук создан",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      error.response?.data?.message || "Ошибка при создании вебхука",
    onSuccess: () => {
      onClose();
    },
  });

  const onSubmit = (values: WebhookFormValues) => {
    mutation.mutate(values.url.trim());
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
          label="URL вебхука"
          {...register("url")}
          fullWidth
          error={!!errors.url}
          helperText={errors.url?.message}
        />
      </FormFieldset>

      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button type="submit" variant="contained" disabled={mutation.isPending}>
          Создать
        </Button>
      </Box>
    </Box>
  );
};
