import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import Checkbox from "@mui/material/Checkbox";
import type { Column, Device } from "@/shared/types";
import type { CreateDeviceColumnsParams } from "../types";

export const createDeviceColumns = ({
  selectedIds,
  allSelected,
  isIndeterminate,
  onToggleAll,
  onToggleOne,
  onVerify,
  onDeleteOne,
}: CreateDeviceColumnsParams): Column<Device>[] => [
  {
    id: "select",
    header: (
      <Checkbox
        checked={allSelected}
        indeterminate={isIndeterminate}
        onChange={(e) => onToggleAll(e.target.checked)}
      />
    ),
    cell: (d) => (
      <Checkbox
        checked={selectedIds.includes(d.id)}
        onChange={() => onToggleOne(d.id)}
      />
    ),
  },
  {
    id: "id",
    header: "ID",
    cell: (d) => d.id,
  },
  {
    id: "deviceId",
    header: "Device ID",
    cell: (d) => d.deviceId,
  },
  {
    id: "user",
    header: "Пользователь",
    cell: (d) => {
      const user = d.user;

      if (!user) return "-";

      const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

      return fullName || user.email || "-";
    },
  },
  {
    id: "createdAt",
    header: "Создан",
    cell: (d) => new Date(d.createdAt).toLocaleString("ru-RU"),
  },
  {
    id: "actions",
    header: "Действия",
    align: "right",
    cell: (d) => (
      <Box display="flex" justifyContent="flex-end" gap={1}>
        {!d.verified && (
          <IconButton color="success" onClick={() => onVerify(d.id)}>
            <CheckIcon />
          </IconButton>
        )}

        <IconButton color="error" onClick={() => onDeleteOne(d.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];
