import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createWebhook } from "../../api";

interface Props {
  onClose: () => void;
}

export const WebhookForm = ({ onClose }: Props) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.error("Введите URL вебхука");
      return;
    }

    try {
      setLoading(true);
      await createWebhook(url.trim());
      toast.success("Вебхук создан");

      await queryClient.invalidateQueries({ queryKey: ["webhooks"] });
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при создании вебхука"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TextField
        label="URL вебхука"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
      />

      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button type="submit" variant="contained" disabled={loading}>
          Создать
        </Button>
      </Box>
    </Box>
  );
};
