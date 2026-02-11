import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
  createWebhookColumns,
  useWebhooks,
  WebhookForm,
} from "@/features/webhooks";
import type { Webhook } from "@/entities/webhooks";
import { DataTable } from "@/shared/ui/data-table";
import { Modal } from "@/shared/ui/modal";
import { ListSection } from "@/shared/ui/list-section";

export const WebhooksWidget = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    webhooks,
    hasWebhooks,
    emptyText,
    isLoading,
    isError,
    handleDelete,
  } = useWebhooks();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const columns = createWebhookColumns(handleDelete);

  const toolbar = (
    <Box mb={2} display="flex" alignItems="center" justifyContent="flex-end">
      <Button onClick={openModal} variant="contained" color="primary">
        Создать
      </Button>
    </Box>
  );

  return (
    <>
      <ListSection
        isLoading={isLoading}
        isError={isError}
        errorText="Ошибка при загрузке вебхуков"
        hasItems={hasWebhooks}
        emptyText={emptyText}
        toolbar={toolbar}
      >
        <DataTable
          rows={webhooks}
          columns={columns}
          getRowId={(w: Webhook) => w.id}
        />
      </ListSection>

      <Modal open={isModalOpen} onClose={closeModal} title="Создать вебхук">
        <WebhookForm onClose={closeModal} />
      </Modal>
    </>
  );
};
