import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface Props {
  isAdmin: boolean;
  onCreate: () => void;
}

export const GroupsHeader = ({ isAdmin, onCreate }: Props) => (
  <Box mb={2} display="flex" alignItems="center" justifyContent="flex-end">
    {isAdmin && (
      <Button onClick={onCreate} variant="contained" color="primary">
        Создать
      </Button>
    )}
  </Box>
);
