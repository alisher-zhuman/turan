import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { deleteWebhook, getWebhooks, type Webhook } from "@/entities/webhooks";

export const useWebhooks = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["webhooks"],
    queryFn: () => getWebhooks(),
    staleTime: 5000,
  });

  const webhooks: Webhook[] = data ?? [];
  const hasWebhooks = webhooks.length > 0;
  const emptyText = "Вебхуки не найдены";

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["webhooks"] });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteWebhook(id),
    onSuccess: () => {
      toast.success("Вебхук удалён");
      void invalidate();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении вебхука",
      );
    },
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
