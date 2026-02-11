import type { ReactNode } from "react";
import type { Column } from "@/shared/types";
import type { Device } from "@/entities/devices";
import { DataTable } from "@/shared/ui/data-table";
import { ListSection } from "@/shared/ui/list-section";
import { Pagination } from "@/shared/ui/pagination";

interface Props {
  isLoading: boolean;
  isError: boolean;
  hasDevices: boolean;
  emptyText: string;
  devices: Device[];
  columns: Column<Device>[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  toolbar?: ReactNode;
}

export const DevicesTableSection = ({
  isLoading,
  isError,
  hasDevices,
  emptyText,
  devices,
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
    errorText="Ошибка при загрузке устройств"
    hasItems={hasDevices}
    emptyText={emptyText}
    toolbar={toolbar}
    pagination={
      <Pagination
        page={page}
        limit={limit}
        total={total}
        onPageChange={onPageChange}
        rowsPerPageOptions={[5, 10, 20]}
        labelRowsPerPage="Устройств на странице:"
        onLimitChange={onLimitChange}
      />
    }
  >
    <DataTable rows={devices} columns={columns} getRowId={(d) => d.id} />
  </ListSection>
);
