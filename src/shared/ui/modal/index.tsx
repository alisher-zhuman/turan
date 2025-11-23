import { type ReactNode } from "react";
import Box from "@mui/material/Box";
import MUIModal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: number | string;
}

export const Modal = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 600,
}: Props) => (
  <MUIModal
    open={open}
    onClose={onClose}
    aria-labelledby="modal-title"
    closeAfterTransition
  >
    <Box
      sx={{
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: maxWidth,
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: 2,
        p: 3,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        {title && (
          <Typography id="modal-title" variant="h6">
            {title}
          </Typography>
        )}

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box>{children}</Box>
    </Box>
  </MUIModal>
);
