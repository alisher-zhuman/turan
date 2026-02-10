import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

interface Props {
  disabled?: boolean;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const FormFieldset = ({ disabled, children, sx }: Props) => (
  <Box
    component="fieldset"
    disabled={disabled}
    sx={{
      border: "none",
      p: 0,
      m: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      ...sx,
    }}
  >
    {children}
  </Box>
);
