import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Group } from "@/entities/groups";
import type { Column } from "@/shared/types";
import { formatDateTime } from "@/shared/helpers";

export const createGroupColumns = (
  onEdit: (group: Group) => void,
  onDelete: (id: number) => void,
  isAdmin: boolean,
): Column<Group>[] => {
  const columns: Column<Group>[] = [
    {
      id: "id",
      header: "ID",
      cell: (g) => g.id,
    },
    {
      id: "name",
      header: "Название",
      cell: (g) => g.name,
    },
  {
    id: "createdAt",
    header: "Создано",
    cell: (g) => formatDateTime(g.createdAt),
  },
  ];

  if (isAdmin) {
    columns.push({
      id: "actions",
      header: "Действия",
      align: "right",
      cell: (g) => (
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <IconButton color="primary" onClick={() => onEdit(g)}>
            <EditIcon />
          </IconButton>

          <IconButton color="error" onClick={() => onDelete(g.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    });
  }

  return columns;
};
