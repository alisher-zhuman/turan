import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import type { Group } from "@/features/groups/interface";

interface Props {
  status: string;
  onStatusChange: (status: string) => void;
  valveFilter: "all" | "open" | "closed";
  onValveFilterChange: (value: "all" | "open" | "closed") => void;
  isArchived: boolean;
  onArchivedChange: (isArchived: boolean) => void;
  groupId: number | null;
  onGroupChange: (groupId: number | null) => void;
  groups: Group[];
  isAdmin: boolean;
  selectedCount: number;
  onDeleteSelected: () => void;
}

export const MetersFilters = ({
  status,
  onStatusChange,
  valveFilter,
  onValveFilterChange,
  isArchived,
  onArchivedChange,
  groupId,
  onGroupChange,
  groups,
  isAdmin,
  selectedCount,
  onDeleteSelected,
}: Props) => (
  <Box
    mb={2}
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    gap={2}
  >
    <Box display="flex" gap={2}>
      <Select
        sx={{ maxHeight: 38, minWidth: 160 }}
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <MenuItem value="normal">Нормальные</MenuItem>
        <MenuItem value="warning">Предупреждения</MenuItem>
        <MenuItem value="error">С ошибками</MenuItem>
        <MenuItem value="all">Все статусы</MenuItem>
      </Select>

      <Select
        sx={{ maxHeight: 38, minWidth: 160 }}
        value={valveFilter}
        onChange={(e) =>
          onValveFilterChange(e.target.value as "all" | "open" | "closed")
        }
      >
        <MenuItem value="all">Все клапаны</MenuItem>
        <MenuItem value="open">Клапан открыт</MenuItem>
        <MenuItem value="closed">Клапан закрыт</MenuItem>
      </Select>

      <Select
        sx={{ maxHeight: 38, minWidth: 160 }}
        value={groupId ?? "all"}
        onChange={(e) => {
          const value = e.target.value;
          onGroupChange(value === "all" ? null : Number(value));
        }}
      >
        <MenuItem value="all">Все группы</MenuItem>

        {groups.map((g) => (
          <MenuItem key={g.id} value={g.id}>
            {g.name}
          </MenuItem>
        ))}
      </Select>

      <Select
        sx={{ maxHeight: 38, minWidth: 160 }}
        value={isArchived ? "archived" : "active"}
        onChange={(e) => onArchivedChange(e.target.value === "archived")}
      >
        <MenuItem value="active">Активные</MenuItem>
        <MenuItem value="archived">Архивные</MenuItem>
      </Select>
    </Box>

    {isAdmin && (
      <Button
        variant="outlined"
        color="error"
        disabled={selectedCount === 0}
        onClick={onDeleteSelected}
      >
        Удалить выбранные
      </Button>
    )}
  </Box>
);
