import { useQuery } from "@tanstack/react-query";

import { getWebhooks, type Webhook, webhooksKeys } from "@/entities/webhooks";

const WEBHOOKS_QUERY_OPTIONS = {
  staleTime: 60_000,
  retry: 1,
} as const;

export const useWebhooksQuery = () => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: webhooksKeys.all,
    queryFn: () => getWebhooks(),
    staleTime: WEBHOOKS_QUERY_OPTIONS.staleTime,
    retry: WEBHOOKS_QUERY_OPTIONS.retry,
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
