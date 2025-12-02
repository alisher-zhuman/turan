import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface Props {
  isAdmin: boolean;
  canManageMetersToGroups: boolean;
  selectedCount: number;
  hasGroups: boolean;
  onOpenFilters: () => void;
  onResetFilters: () => void;
  onDeleteSelected: () => void;
  onAddSelectedToGroup: () => void;
  onRemoveSelectedFromGroup: () => void;
}

export const MetersActions = ({
  isAdmin,
  canManageMetersToGroups,
  selectedCount,
  hasGroups,
  onOpenFilters,
  onResetFilters,
  onDeleteSelected,
  onAddSelectedToGroup,
  onRemoveSelectedFromGroup,
}: Props) => (
  <Box
    mb={2}
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    gap={2}
  >
    <Box display="flex" gap={1}>
      <Button variant="outlined" onClick={onOpenFilters}>
        Фильтры
      </Button>

      <Button variant="text" onClick={onResetFilters}>
        Очистить фильтры
      </Button>
    </Box>

    <Box display="flex" gap={1}>
      {canManageMetersToGroups && (
        <>
          <Button
            variant="outlined"
            disabled={selectedCount === 0 || !hasGroups}
            onClick={onAddSelectedToGroup}
          >
            Добавить в группу
          </Button>

          <Button
            variant="outlined"
            disabled={selectedCount === 0 || !hasGroups}
            onClick={onRemoveSelectedFromGroup}
          >
            Удалить из группы
          </Button>
        </>
      )}

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
  </Box>
);
