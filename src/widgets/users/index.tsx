import { useMemo } from "react";
import {
  createUserColumns,
  useUserActions,
  useUserFilters,
  useUsersQuery,
} from "@/features/users";
import { useRoleAccess } from "@/shared/hooks";
import { usePagination } from "@/shared/hooks";
import { TableSection } from "@/shared/ui/table-section";
import { ERROR_TEXTS, ROWS_PER_PAGE_LABELS } from "@/shared/constants";
import { UsersHeader } from "./ui/users-header";
import { UsersModals } from "./ui/users-modals";
import { useUsersUiState } from "./hooks/useUsersUiState";

export const UsersWidget = () => {
  const { canDeleteUsers } = useRoleAccess();

  const { isArchived, setIsArchived, filtersKey } = useUserFilters();

  const { page, limit, setPage, setLimit } = usePagination({
    resetKey: filtersKey,
  });

  const { users, total, hasUsers, emptyText, isLoading, isError } =
    useUsersQuery({ page, limit, isArchived });

  const { handleToggleArchive, handleDeleteUser } = useUserActions();

  const {
    isModalOpen,
    editingUser,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useUsersUiState();

  const columns = useMemo(
    () =>
      createUserColumns(
        handleToggleArchive,
        openEditModal,
        canDeleteUsers,
        handleDeleteUser,
      ),
    [handleToggleArchive, openEditModal, canDeleteUsers, handleDeleteUser],
  );

  return (
    <>
      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText={ERROR_TEXTS.users}
        hasItems={hasUsers}
        emptyText={emptyText}
        toolbar={
          <UsersHeader
            isArchived={isArchived}
            onChangeArchived={setIsArchived}
            onCreate={openCreateModal}
          />
        }
        pagination={{
          page,
          limit,
          total,
          onPageChange: setPage,
          rowsPerPageOptions: [5, 10, 20],
          labelRowsPerPage: ROWS_PER_PAGE_LABELS.users,
          onLimitChange: setLimit,
        }}
        rows={users}
        columns={columns}
        getRowId={(user) => user.id}
      />

      <UsersModals
        isOpen={isModalOpen}
        editingUser={editingUser}
        onClose={closeModal}
      />
    </>
  );
};
