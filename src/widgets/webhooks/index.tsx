import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import {
  createWebhookColumns,
  useWebhooks,
  WebhookForm,
} from "@/features/webhooks";
import type { Webhook } from "@/entities/webhooks";
import { DataTable } from "@/shared/ui/data-table";
import { Loader } from "@/shared/ui/loader";
import { Modal } from "@/shared/ui/modal";

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

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Alert severity="error">Ошибка при загрузке вебхуков</Alert>;
  }

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const columns = createWebhookColumns(handleDelete);

  return (
    <>
      <Box>
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button onClick={openModal} variant="contained" color="primary">
            Создать
          </Button>
        </Box>

        {!hasWebhooks && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {emptyText}
          </Alert>
        )}

        {hasWebhooks && (
          <DataTable
            rows={webhooks}
            columns={columns}
            getRowId={(w: Webhook) => w.id}
          />
        )}
      </Box>

      <Modal open={isModalOpen} onClose={closeModal} title="Создать вебхук">
        <WebhookForm onClose={closeModal} />
      </Modal>
    </>
  );
};
