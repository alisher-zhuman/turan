import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

import type { Meter } from "@/entities/meters";

import type { Column } from "@/shared/types";

import { STATUS_LABELS, VALVE_LABELS } from "../constants";
import type { CreateMeterColumnsParams } from "../types";

export const createMeterColumns = ({
  isAdmin,
  canEdit,
  canManageMetersToGroups,
  selectedIds,
  allSelected,
  isIndeterminate,
  onToggleAll,
  onToggleOne,
  onEdit,
  onDeleteOne,
  onCommand,
  onView,
}: CreateMeterColumnsParams): Column<Meter>[] => {
  const columns: Column<Meter>[] = [];

  if (canManageMetersToGroups) {
    columns.push({
      id: "select",
      header: (
        <Checkbox
          checked={allSelected}
          indeterminate={isIndeterminate}
          onChange={(e) => onToggleAll(e.target.checked)}
        />
      ),
      cell: (m) => (
        <Checkbox
          checked={selectedIds.includes(m.id)}
          onChange={() => onToggleOne(m.id)}
        />
      ),
    });
  }

  columns.push(
    {
      id: "id",
      header: "ID",
      cell: (m) => m.id,
    },
    {
      id: "name",
      header: "Номер счётчика",
      cell: (m) => m.name,
    },
    {
      id: "client",
      header: "Клиент",
      cell: (m) => m.client || "-",
    },
    {
      id: "valveStatus",
      header: "Клапан",
      cell: (m) => {
        const label = m.valveStatus
          ? VALVE_LABELS[m.valveStatus] || m.valveStatus
          : "-";

        const color =
          m.valveStatus === "open"
            ? "#2e7d32"
            : m.valveStatus === "closed"
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
      id: "status",
      header: "Статус",
      cell: (m) => {
        const label = STATUS_LABELS[m.status] || m.status || "-";

        const color =
          m.status === "normal"
            ? "#2e7d32"
            : m.status === "warning"
              ? "#ed6c02"
              : m.status === "error"
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
      id: "lastReading",
      header: "Последнее показание",
      cell: (m) => m.lastReading ?? "-",
    },
  );

  if (isAdmin || canEdit) {
    columns.push({
      id: "actions",
      header: "Действия",
      align: "right",
      cell: (m) => {
        const isOpen = m.valveStatus === "open";

        return (
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <IconButton onClick={() => onView(m)}>
              <InfoIcon />
            </IconButton>

            {isAdmin && (
              <>
                {!isOpen && (
                  <IconButton
                    color="success"
                    onClick={() => onCommand(m.id, "open")}
                  >
                    <ToggleOnIcon />
                  </IconButton>
                )}

                {isOpen && (
                  <IconButton
                    color="warning"
                    onClick={() => onCommand(m.id, "close")}
                  >
                    <ToggleOffIcon />
                  </IconButton>
                )}
              </>
            )}

            {canEdit && (
              <IconButton color="primary" onClick={() => onEdit(m)}>
                <EditIcon />
              </IconButton>
            )}

            {isAdmin && (
              <IconButton color="error" onClick={() => onDeleteOne(m.id)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        );
      },
    });
  }

  return columns;
};
