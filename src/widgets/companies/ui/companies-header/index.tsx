import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  isArchived: boolean;
  onChangeArchived: (archived: boolean) => void;
  onCreate: () => void;
}

export const CompaniesHeader = ({
  isArchived,
  onChangeArchived,
  onCreate,
}: Props) => (
  <Box
    mb={2}
    display="flex"
    alignItems="center"
    justifyContent="flex-end"
    gap={2}
  >
    <Select
      sx={{ maxHeight: 38 }}
      value={isArchived ? "archived" : "active"}
      onChange={(e) => onChangeArchived(e.target.value === "archived")}
    >
      <MenuItem value="active">Активные</MenuItem>
      <MenuItem value="archived">Архивные</MenuItem>
    </Select>

    <Button onClick={onCreate} variant="contained" color="primary">
      Создать
    </Button>
  </Box>
);
