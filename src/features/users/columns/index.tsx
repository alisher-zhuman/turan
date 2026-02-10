import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ROLE_LABELS } from "@/shared/constants";
import type { Column } from "@/shared/types";
import { formatDateTime } from "@/shared/helpers";
import type { UserRow } from "@/entities/users";

export const createUserColumns = (
  onToggleArchive: (userId: number, isArchived: boolean) => void,
  onEdit: (user: UserRow) => void,
  canDelete: boolean,
  onDelete: (userId: number) => void,
): Column<UserRow>[] => [
  {
    id: "id",
    header: "ID",
    cell: (user) => user.id,
  },
  {
    id: "email",
    header: "Почта",
    cell: (user) => user.email,
  },
  {
    id: "fullName",
    header: "ФИО",
    cell: (user) => {
      const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
      return fullName || "-";
    },
  },
  {
    id: "company",
    header: "Компания",
    cell: (user) => user.company?.name ?? "-",
  },
  {
    id: "role",
    header: "Роль",
    cell: (user) => ROLE_LABELS[user.role],
  },
  {
    id: "createdAt",
    header: "Дата создания",
    cell: (user) => {
      return formatDateTime(user.createdAt, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    id: "actions",
    header: "Действия",
    align: "right",
    cell: (user) => (
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <IconButton
          color={user.isArchived ? "success" : "warning"}
          onClick={() => onToggleArchive(user.id, user.isArchived)}
        >
          {user.isArchived ? <UnarchiveIcon /> : <ArchiveIcon />}
        </IconButton>

        <IconButton color="primary" onClick={() => onEdit(user)}>
          <EditIcon />
        </IconButton>

        {canDelete && (
          <IconButton color="error" onClick={() => onDelete(user.id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    ),
  },
];
