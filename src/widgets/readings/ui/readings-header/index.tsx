import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface Props {
  isAdmin: boolean;
  selectedCount: number;
  onDeleteSelected: () => void;
}

export const ReadingsHeader = ({
  isAdmin,
  selectedCount,
  onDeleteSelected,
}: Props) => (
  <Box mb={2} display="flex" alignItems="center" justifyContent="flex-end">
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
