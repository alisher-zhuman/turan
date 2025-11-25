import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { WebhookForm } from "@/features/webhook/ui/webhook-form";
import { createWebhookColumns } from "@/features/webhook/columns";
import { deleteWebhook, getWebhooks } from "@/features/webhook/api";
import type { Webhook } from "@/features/webhook/interfaces";
import { DataTable } from "@/shared/ui/data-table";
import { Loader } from "@/shared/ui/loader";
import { Modal } from "@/shared/ui/modal";

const Webhooks = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["webhooks"],
    queryFn: () => getWebhooks(),
    staleTime: 5000,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Alert severity="error">Ошибка при загрузке вебхуков</Alert>;
  }

  const webhooks = data ?? [];
  const hasWebhooks = webhooks.length > 0;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleDelete = async (id: number) => {
    try {
      await deleteWebhook(id);
      toast.success("Вебхук удалён");

      await queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении вебхука"
      );
    }
  };

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
            Вебхуки не найдены
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

export default Webhooks;
