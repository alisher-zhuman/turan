import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import type { Group } from "@/features/groups/interface";
import { Modal } from "@/shared/ui/modal";

interface Props {
  open: boolean;
  onClose: () => void;
  status: string;
  onStatusChange: (status: string) => void;
  valveFilter: "all" | "open" | "closed";
  onValveFilterChange: (value: "all" | "open" | "closed") => void;
  isArchived: boolean;
  onArchivedChange: (isArchived: boolean) => void;
  groupId: number | null;
  onGroupChange: (groupId: number | null) => void;
  groups: Group[];
  customerId: string;
  onCustomerIdChange: (value: string) => void;
  meterName: string;
  onMeterNameChange: (value: string) => void;
}

export const MetersFiltersModal = ({
  open,
  onClose,
  status,
  onStatusChange,
  valveFilter,
  onValveFilterChange,
  isArchived,
  onArchivedChange,
  groupId,
  onGroupChange,
  groups,
  customerId,
  onCustomerIdChange,
  meterName,
  onMeterNameChange,
}: Props) => (
  <Modal open={open} onClose={onClose} title="Фильтры">
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        fullWidth
        label="ID клиента"
        value={customerId}
        onChange={(e) => onCustomerIdChange(e.target.value)}
        size="small"
      />

      <TextField
        fullWidth
        label="Номер счётчика"
        value={meterName}
        onChange={(e) => onMeterNameChange(e.target.value)}
        size="small"
      />

      <Select
        fullWidth
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        size="small"
      >
        <MenuItem value="normal">Нормальные</MenuItem>
        <MenuItem value="warning">Предупреждения</MenuItem>
        <MenuItem value="error">С ошибками</MenuItem>
        <MenuItem value="all">Все статусы</MenuItem>
      </Select>

      <Select
        fullWidth
        value={valveFilter}
        onChange={(e) =>
          onValveFilterChange(e.target.value as "all" | "open" | "closed")
        }
        size="small"
      >
        <MenuItem value="all">Все клапаны</MenuItem>
        <MenuItem value="open">Клапан открыт</MenuItem>
        <MenuItem value="closed">Клапан закрыт</MenuItem>
      </Select>

      <Select
        fullWidth
        value={groupId ?? "all"}
        onChange={(e) => {
          const value = e.target.value;
          onGroupChange(value === "all" ? null : Number(value));
        }}
        size="small"
      >
        <MenuItem value="all">Все группы</MenuItem>

        {groups.map((g) => (
          <MenuItem key={g.id} value={g.id}>
            {g.name}
          </MenuItem>
        ))}
      </Select>

      <Select
        fullWidth
        value={isArchived ? "archived" : "active"}
        onChange={(e) => onArchivedChange(e.target.value === "archived")}
        size="small"
      >
        <MenuItem value="active">Активные</MenuItem>
        <MenuItem value="archived">Архивные</MenuItem>
      </Select>
    </Box>
  </Modal>
);
