import type { ReactNode } from "react";
import type { Column } from "@/shared/types";
import type { Group } from "@/entities/groups";
import { DataTable } from "@/shared/ui/data-table";
import { ListSection } from "@/shared/ui/list-section";
import { Pagination } from "@/shared/ui/pagination";

interface Props {
  isLoading: boolean;
  isError: boolean;
  hasGroups: boolean;
  emptyText: string;
  groups: Group[];
  columns: Column<Group>[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  toolbar?: ReactNode;
}

export const GroupsTableSection = ({
  isLoading,
  isError,
  hasGroups,
  emptyText,
  groups,
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
    errorText="Ошибка при загрузке групп"
    hasItems={hasGroups}
    emptyText={emptyText}
    toolbar={toolbar}
    pagination={
      <Pagination
        page={page}
        limit={limit}
        total={total}
        onPageChange={onPageChange}
        rowsPerPageOptions={[5, 10, 20]}
        labelRowsPerPage="Групп на странице:"
        onLimitChange={onLimitChange}
      />
    }
  >
    <DataTable rows={groups} columns={columns} getRowId={(g) => g.id} />
  </ListSection>
);
