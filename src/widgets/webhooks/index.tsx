import { useMemo } from "react";
import {
  createWebhookColumns,
  useWebhookActions,
  useWebhooksQuery,
} from "@/features/webhooks";
import { TableSection } from "@/shared/ui/table-section";
import { WebhooksHeader } from "./ui/webhooks-header";
import { WebhooksModals } from "./ui/webhooks-modals";
import { useWebhooksUiState } from "./hooks/useWebhooksUiState";

export const WebhooksWidget = () => {
  const { webhooks, hasWebhooks, emptyText, isLoading, isError } =
    useWebhooksQuery();

  const { handleDelete } = useWebhookActions();

  const { isModalOpen, openModal, closeModal } = useWebhooksUiState();

  const columns = useMemo(
    () => createWebhookColumns(handleDelete),
    [handleDelete],
  );

  const toolbar = <WebhooksHeader onCreate={openModal} />;

  return (
    <>
      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText="Ошибка при загрузке вебхуков"
        hasItems={hasWebhooks}
        emptyText={emptyText}
        toolbar={toolbar}
        rows={webhooks}
        columns={columns}
        getRowId={(w) => w.id}
      />

      <WebhooksModals isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
