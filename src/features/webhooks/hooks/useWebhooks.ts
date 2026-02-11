import { useWebhookActions } from "./useWebhookActions";
import { useWebhooksQuery } from "./useWebhooksQuery";

export const useWebhooks = () => {
  const {
    webhooks,
    hasWebhooks,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useWebhooksQuery();

  const { handleDelete } = useWebhookActions();

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
