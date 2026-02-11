import { useQuery } from "@tanstack/react-query";
import { getWebhooks, type Webhook } from "@/entities/webhooks";

export const useWebhooksQuery = () => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["webhooks"],
    queryFn: () => getWebhooks(),
  });

  const webhooks: Webhook[] = data ?? [];
  const hasWebhooks = webhooks.length > 0;
  const emptyText = "Вебхуки не найдены";

  return {
    webhooks,
    hasWebhooks,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
