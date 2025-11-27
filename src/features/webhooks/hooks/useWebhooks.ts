import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { deleteWebhook, getWebhooks } from "../api";
import type { Webhook } from "../interfaces";

export const useWebhooks = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["webhooks"],
    queryFn: () => getWebhooks(),
    staleTime: 5000,
  });

  const webhooks: Webhook[] = data ?? [];
  const hasWebhooks = webhooks.length > 0;
  const emptyText = "Вебхуки не найдены";

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ["webhooks"] });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteWebhook(id);
      toast.success("Вебхук удалён");
      await invalidate();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении вебхука"
      );
    }
  };

  return {
    webhooks,
    hasWebhooks,
    emptyText,
    isLoading,
    isError,
    handleDelete,
  };
};
