import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface Props {
  isAdmin: boolean;
  canManageMetersToGroups: boolean;
  selectedCount: number;
  hasGroups: boolean;
  onCreate: () => void;
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
  onCreate,
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
    flexWrap="wrap"
    gap={2}
  >
    <Box display="flex" flexWrap="wrap" gap={1}>
      {isAdmin && (
        <Button size="small" variant="contained" onClick={onCreate}>
          Создать
        </Button>
      )}

      <Button size="small" variant="outlined" onClick={onOpenFilters}>
        Фильтры
      </Button>

      <Button size="small" variant="text" onClick={onResetFilters}>
        Очистить фильтры
      </Button>
    </Box>

    <Box display="flex" flexWrap="wrap" gap={1}>
      {canManageMetersToGroups && (
        <>
          <Button
            size="small"
            variant="outlined"
            disabled={selectedCount === 0 || !hasGroups}
            onClick={onAddSelectedToGroup}
          >
            Добавить в группу
          </Button>

          <Button
            size="small"
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
          size="small"
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
