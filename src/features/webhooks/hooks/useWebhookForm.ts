import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";

import { createWebhook, webhooksKeys } from "@/entities/webhooks";

import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

import { WebhookFormSchema } from "../model/schema";
import type { WebhookFormValues } from "../model/types";

interface Params {
  onClose: () => void;
}

export const useWebhookForm = ({ onClose }: Params) => {
  const { handleSubmit, control } = useForm<WebhookFormValues>({
    resolver: zodResolver(WebhookFormSchema),
    defaultValues: {
      url: "",
    },
  });

  const mutation = useToastMutation({
    mutationFn: (url: string) => createWebhook(url),
    invalidateKeys: [webhooksKeys.all],
    successMessage: "Вебхук создан",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при создании вебхука"),
    onSuccess: () => {
      onClose();
    },
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values.url.trim());
  });

  return {
    control,
    onSubmit,
    isPending: mutation.isPending,
  };
};
