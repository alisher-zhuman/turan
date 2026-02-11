import type { ReactNode } from "react";
import type { Column } from "@/shared/types";
import type { Reading } from "@/entities/readings";
import { DataTable } from "@/shared/ui/data-table";
import { ListSection } from "@/shared/ui/list-section";
import { Pagination } from "@/shared/ui/pagination";

interface Props {
  isLoading: boolean;
  isError: boolean;
  hasReadings: boolean;
  emptyText: string;
  readings: Reading[];
  columns: Column<Reading>[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  toolbar?: ReactNode;
}

export const ReadingsTableSection = ({
  isLoading,
  isError,
  hasReadings,
  emptyText,
  readings,
  columns,
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
  toolbar,
}: Props) => (
  <ListSection
    isLoading={isLoading}
    isError={isError}
    errorText="Ошибка при загрузке показаний водомеров"
    hasItems={hasReadings}
    emptyText={emptyText}
    toolbar={toolbar}
    pagination={
      <Pagination
        page={page}
        limit={limit}
        total={total}
        onPageChange={onPageChange}
        rowsPerPageOptions={[5, 10, 20]}
        labelRowsPerPage="Показаний на странице:"
        onLimitChange={onLimitChange}
      />
    }
  >
    <DataTable
      rows={readings}
      columns={columns}
      getRowId={(r) => r.id}
    />
  </ListSection>
);
