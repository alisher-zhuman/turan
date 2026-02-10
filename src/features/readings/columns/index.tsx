import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Reading } from "@/entities/readings";
import type { Column } from "@/shared/types";
import { formatDateTime } from "@/shared/helpers";
import type { CreateReadingColumnsParams } from "../types";

export const createReadingColumns = ({
  isAdmin,
  selectedIds,
  allSelected,
  isIndeterminate,
  onToggleAll,
  onToggleOne,
  onDeleteOne,
}: CreateReadingColumnsParams): Column<Reading>[] => {
  const columns: Column<Reading>[] = [];

  if (isAdmin) {
    columns.push({
      id: "select",
      header: (
        <Checkbox
          checked={allSelected}
          indeterminate={isIndeterminate}
          onChange={(e) => onToggleAll(e.target.checked)}
        />
      ),
      cell: (r) => (
        <Checkbox
          checked={selectedIds.includes(r.id)}
          onChange={() => onToggleOne(r.id)}
        />
      ),
    });
  }

  columns.push(
    {
      id: "id",
      header: "ID",
      cell: (r) => r.id,
    },
    {
      id: "meterName",
      header: "Счётчик",
      cell: (r) => r.meter.name,
    },
    {
      id: "value",
      header: "Показание",
      cell: (r) => r.value,
    },
    {
      id: "valveState",
      header: "Клапан",
      cell: (r) => {
        const label =
          r.valveState === "open"
            ? "Открыт"
            : r.valveState === "closed"
              ? "Закрыт"
              : r.valveState || "-";

        const color =
          r.valveState === "open"
            ? "#2e7d32"
            : r.valveState === "closed"
              ? "#d32f2f"
              : "inherit";

        return (
          <Box component="span" sx={{ color, fontWeight: 500 }}>
            {label}
          </Box>
        );
      },
    },
    {
      id: "batteryStatus",
      header: "Батарея",
      cell: (r) =>
        typeof r.batteryStatus === "number" ? `${r.batteryStatus}%` : "-",
    },
    {
      id: "readingAt",
      header: "Время показания",
      cell: (r) => formatDateTime(r.readingAt),
    },
  );

  if (isAdmin) {
    columns.push({
      id: "actions",
      header: "Действия",
      align: "right",
      cell: (r) => (
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <IconButton color="error" onClick={() => onDeleteOne(r.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    });
  }

  return columns;
};
