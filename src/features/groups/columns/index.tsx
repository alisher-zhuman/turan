import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

import type { Group } from "@/entities/groups";

import { formatDateTime } from "@/shared/helpers";
import type { Column } from "@/shared/types";

export const createGroupColumns = (
  onOpenMetersByGroup: (group: Group) => void,
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
      header: "Название группы",
      cell: (g) => (
        <Link
          component="button"
          type="button"
          underline="hover"
          onClick={() => onOpenMetersByGroup(g)}
        >
          {g.name}
        </Link>
      ),
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
