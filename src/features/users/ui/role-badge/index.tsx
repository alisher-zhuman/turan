import Box from "@mui/material/Box";
import { alpha, useTheme } from "@mui/material/styles";

import { ROLE, ROLE_LABELS } from "@/shared/constants";
import type { Role } from "@/shared/types";

interface Props {
  role: Role;
  label?: string;
}

export const RoleBadge = ({ role, label }: Props) => {
  const theme = useTheme();

  const toneStyles =
    role === ROLE.SUPER_ADMIN
      ? {
          color: theme.palette.error.dark,
          backgroundColor: alpha(theme.palette.error.main, 0.12),
        }
      : role === ROLE.ADMIN
        ? {
            color: theme.palette.primary.dark,
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
          }
        : role === ROLE.CONTROLLER
          ? {
              color: theme.palette.warning.dark,
              backgroundColor: alpha(theme.palette.warning.main, 0.14),
            }
          : {
              color: theme.palette.success.dark,
              backgroundColor: alpha(theme.palette.success.main, 0.12),
            };

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1.5,
        py: 0.75,
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...toneStyles,
      }}
    >
      {label ?? ROLE_LABELS[role]}
    </Box>
  );
};
