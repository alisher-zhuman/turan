import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import type { Column } from "@/shared/types";
import { copyToClipboard } from "@/shared/utils/helpers";
import type { Company } from "../interfaces/companies";

export const createCompanyColumns = (
  onRefreshToken: (id: number) => void,
  onToggleArchive: (id: number, isArchived: boolean) => void,
  onEdit: (company: Company) => void
): Column<Company>[] => [
  {
    id: "id",
    header: "ID",
    cell: (c) => c.id,
  },
  {
    id: "name",
    header: "Название",
    cell: (c) => c.name,
  },
  {
    id: "address",
    header: "Адрес",
    cell: (c) => c.address,
  },
  {
    id: "apiKey",
    header: "API ключ",
    cell: (c) =>
      c.key ? (
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton size="small" onClick={() => copyToClipboard(c.key!.key)}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>

          <IconButton size="small" onClick={() => onRefreshToken(c.id)}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        "Нет API ключа"
      ),
  },
  {
    id: "createdAt",
    header: "Создано",
    cell: (c) => new Date(c.createdAt).toLocaleString("ru-RU"),
  },
  {
    id: "actions",
    header: "Действия",
    align: "right",
    cell: (c) => (
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <IconButton
          color={c.isArchived ? "success" : "warning"}
          onClick={() => onToggleArchive(c.id, c.isArchived)}
        >
          {c.isArchived ? <UnarchiveIcon /> : <ArchiveIcon />}
        </IconButton>

        <IconButton color="primary" onClick={() => onEdit(c)}>
          <EditIcon />
        </IconButton>
      </Box>
    ),
  },
];
