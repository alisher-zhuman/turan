import type { ReactNode } from "react";
import type { Column } from "@/shared/types";
import type { UserRow } from "@/entities/users";
import { DataTable } from "@/shared/ui/data-table";
import { ListSection } from "@/shared/ui/list-section";
import { Pagination } from "@/shared/ui/pagination";

interface Props {
  isLoading: boolean;
  isError: boolean;
  hasUsers: boolean;
  emptyText: string;
  users: UserRow[];
  columns: Column<UserRow>[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  toolbar?: ReactNode;
}

export const UsersTableSection = ({
  isLoading,
  isError,
  hasUsers,
  emptyText,
  users,
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
    errorText="Ошибка при загрузке пользователей"
    hasItems={hasUsers}
    emptyText={emptyText}
    toolbar={toolbar}
    pagination={
      <Pagination
        page={page}
        limit={limit}
        total={total}
        onPageChange={onPageChange}
        rowsPerPageOptions={[5, 10, 20]}
        labelRowsPerPage="Пользователей на странице:"
        onLimitChange={onLimitChange}
      />
    }
  >
    <DataTable rows={users} columns={columns} getRowId={(user) => user.id} />
  </ListSection>
);
