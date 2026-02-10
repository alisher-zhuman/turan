import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { deleteWebhook, getWebhooks, type Webhook } from "@/entities/webhooks";
import { useToastMutation } from "@/shared/hooks";

export const useWebhooks = () => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["webhooks"],
    queryFn: () => getWebhooks(),
    staleTime: 5000,
  });

  const webhooks: Webhook[] = data ?? [];
  const hasWebhooks = webhooks.length > 0;
  const emptyText = "Вебхуки не найдены";

  const deleteMutation = useToastMutation({
    mutationFn: (id: number) => deleteWebhook(id),
    invalidateKeys: [["webhooks"]],
    successMessage: "Вебхук удалён",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      error.response?.data?.message || "Ошибка при удалении вебхука",
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return {
    webhooks,
    hasWebhooks,
    emptyText,
    isLoading,
    isError,
    isFetching,
    handleDelete,
  };
};
