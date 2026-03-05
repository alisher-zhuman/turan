import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface Props {
  isAdmin: boolean;
  selectedCount: number;
  onOpenFilters: () => void;
  onResetFilters: () => void;
  onDeleteSelected: () => void;
}

export const ReadingsActions = ({
  isAdmin,
  selectedCount,
  onOpenFilters,
  onResetFilters,
  onDeleteSelected,
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
      <Button size="small" variant="outlined" onClick={onOpenFilters}>
        Фильтры
      </Button>

      <Button size="small" variant="text" onClick={onResetFilters}>
        Очистить фильтры
      </Button>
    </Box>

    <Box display="flex" flexWrap="wrap" gap={1}>
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
