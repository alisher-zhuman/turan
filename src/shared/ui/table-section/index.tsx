import type { ReactNode } from "react";

import type { AlertProps } from "@mui/material/Alert";
import type { SxProps, Theme } from "@mui/material/styles";

import type { Column } from "@/shared/types";
import { DataTable } from "@/shared/ui/data-table";
import { ListSection } from "@/shared/ui/list-section";
import { Pagination } from "@/shared/ui/pagination";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  rowsPerPageOptions?: number[];
  labelRowsPerPage?: string;
}

interface Props<T> {
  isLoading: boolean;
  isError: boolean;
  errorText: string;
  errorVariant?: AlertProps["variant"];
  errorSx?: SxProps<Theme>;
  hasItems: boolean;
  emptyText?: string;
  emptySx?: SxProps<Theme>;
  toolbar?: ReactNode;
  rows: T[];
  columns: Column<T>[];
  getRowId: (row: T) => string | number;
  pagination?: PaginationProps;
}

export const TableSection = <T,>({
  isLoading,
  isError,
  errorText,
  errorVariant,
  errorSx,
  hasItems,
  emptyText,
  emptySx,
  toolbar,
  rows,
  columns,
  getRowId,
  pagination,
}: Props<T>) => (
  <ListSection
    isLoading={isLoading}
    isError={isError}
    errorText={errorText}
    errorVariant={errorVariant}
    errorSx={errorSx}
    hasItems={hasItems}
    emptyText={emptyText}
    emptySx={emptySx}
    toolbar={toolbar}
    pagination={
      pagination ? (
        <Pagination
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          onPageChange={pagination.onPageChange}
          rowsPerPageOptions={pagination.rowsPerPageOptions ?? [5, 10, 20]}
          labelRowsPerPage={pagination.labelRowsPerPage}
          onLimitChange={pagination.onLimitChange}
        />
      ) : undefined
    }
  >
    <DataTable rows={rows} columns={columns} getRowId={getRowId} />
  </ListSection>
);
