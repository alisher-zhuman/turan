import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface Props {
  onCreate: () => void;
}

export const WebhooksHeader = ({ onCreate }: Props) => (
  <Box mb={2} display="flex" alignItems="center" justifyContent="flex-end">
    <Button onClick={onCreate} variant="contained" color="primary">
      Создать
    </Button>
  </Box>
);
