import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  verified: boolean;
  onChangeVerified: (value: boolean) => void;
  selectedCount: number;
  onDeleteSelected: () => void;
}

export const DevicesHeader = ({
  verified,
  onChangeVerified,
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
    <Select
      sx={{ maxHeight: 38 }}
      value={verified ? "verified" : "unverified"}
      onChange={(e) => onChangeVerified(e.target.value === "verified")}
    >
      <MenuItem value="unverified">Неподтверждённые</MenuItem>
      <MenuItem value="verified">Подтверждённые</MenuItem>
    </Select>

    <Button
      variant="outlined"
      color="error"
      disabled={selectedCount === 0}
      onClick={onDeleteSelected}
    >
      Удалить выбранные
    </Button>
  </Box>
);
