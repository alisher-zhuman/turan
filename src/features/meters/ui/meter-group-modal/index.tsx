import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import type { Group } from "@/entities/groups";
import { Modal } from "@/shared/ui/modal";

interface Props {
  open: boolean;
  mode: "add" | "remove";
  groups: Group[];
  selectedCount: number;
  selectedGroupId: number | null;
  onChangeGroup: (groupId: number | null) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export const MeterGroupModal = ({
  open,
  mode,
  groups,
  selectedCount,
  selectedGroupId,
  onChangeGroup,
  onClose,
  onConfirm,
}: Props) => {
  const title =
    mode === "add"
      ? "Добавить выбранные счётчики в группу"
      : "Удалить выбранные счётчики из группы";

  const handleSelectChange = (value: string | number) => {
    if (value === "") {
      onChangeGroup(null);
    } else {
      onChangeGroup(Number(value));
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Select
          fullWidth
          value={selectedGroupId ?? ""}
          onChange={(e) => handleSelectChange(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em>Выберите группу</em>
          </MenuItem>

          {groups.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </Select>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box fontSize={14} color="text.secondary">
            Выбрано счётчиков: {selectedCount}
          </Box>

          <Box display="flex" gap={1}>
            <Button onClick={onClose}>Отмена</Button>
            <Button
              variant="contained"
              onClick={onConfirm}
              disabled={!selectedGroupId || selectedCount === 0}
            >
              {mode === "add" ? "Добавить" : "Удалить"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
