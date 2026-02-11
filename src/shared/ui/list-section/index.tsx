import type { ReactNode } from "react";
import Alert, { type AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import { Loader } from "@/shared/ui/loader";

interface Props {
  isLoading: boolean;
  isError: boolean;
  errorText: string;
  errorVariant?: AlertProps["variant"];
  errorSx?: SxProps<Theme>;
  hasItems: boolean;
  emptyText?: string;
  emptySx?: SxProps<Theme>;
  toolbar?: ReactNode;
  pagination?: ReactNode;
  children?: ReactNode;
}

export const ListSection = ({
  isLoading,
  isError,
  errorText,
  errorVariant,
  errorSx,
  hasItems,
  emptyText,
  emptySx,
  toolbar,
  pagination,
  children,
}: Props) => {
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Alert severity="error" variant={errorVariant} sx={errorSx}>
        {errorText}
      </Alert>
    );
  }

  return (
    <Box>
      {toolbar}

      {!hasItems && emptyText && (
        <Alert severity="info" sx={emptySx ?? { mt: 2 }}>
          {emptyText}
        </Alert>
      )}

      {hasItems && (
        <>
          {children}
          {pagination}
        </>
      )}
    </Box>
  );
};
