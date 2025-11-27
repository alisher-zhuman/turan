import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  label: string;
  value: unknown;
}

export const Field = ({ label, value }: Props) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return (
    <Box display="flex" gap={1}>
      <Typography variant="body2" fontWeight={600}>
        {label}:
      </Typography>
      <Typography variant="body2">{String(value)}</Typography>
    </Box>
  );
};
