import { useMemo } from "react";

import {
  createWebhookColumns,
  useWebhookActions,
  useWebhooksQuery,
} from "@/features/webhooks";

import { ERROR_TEXTS } from "@/shared/constants";
import { TableSection } from "@/shared/ui/table-section";

import { useWebhooksUiState } from "./hooks/useWebhooksUiState";
import { WebhooksActions } from "./ui/webhooks-actions";
import { WebhooksModals } from "./ui/webhooks-modals";

export const WebhooksWidget = () => {
  const { webhooks, hasWebhooks, emptyText, isLoading, isError } =
    useWebhooksQuery();

  const { handleDelete } = useWebhookActions();

  const { isModalOpen, openModal, closeModal } = useWebhooksUiState();

  const columns = useMemo(
    () => createWebhookColumns(handleDelete),
    [handleDelete],
  );

  const toolbar = <WebhooksActions onCreate={openModal} />;

  return (
    <>
      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText={ERROR_TEXTS.webhooks}
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
