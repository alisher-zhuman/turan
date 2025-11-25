import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Column } from "@/shared/types";
import type { Webhook } from "../interfaces";

export const createWebhookColumns = (
  onDelete: (id: number) => void
): Column<Webhook>[] => [
  {
    id: "id",
    header: "ID",
    cell: (w) => w.id,
  },
  {
    id: "url",
    header: "URL",
    cell: (w) => w.url,
  },
  {
    id: "createdAt",
    header: "Создано",
    cell: (w) => new Date(w.createdAt).toLocaleString("ru-RU"),
  },
  {
    id: "actions",
    header: "Действия",
    align: "right",
    cell: (w) => (
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <IconButton color="error" onClick={() => onDelete(w.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];
