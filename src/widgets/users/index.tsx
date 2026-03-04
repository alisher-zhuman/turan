import { useMemo } from "react";

import {
  createUserColumns,
  useUserActions,
  useUserFilters,
  useUsersQuery,
} from "@/features/users";

import type { UserRow } from "@/entities/users";

import { ERROR_TEXTS, ROWS_PER_PAGE_LABELS } from "@/shared/constants";
import { useEntityModal, usePagination, useRoleAccess } from "@/shared/hooks";
import { TableSection } from "@/shared/ui/table-section";

import { useInitialUsersSearchState } from "./hooks/useInitialUsersSearchState";
import { useSyncUsersSearchParams } from "./hooks/useSyncUsersSearchParams";
import { UsersHeader } from "./ui/users-header";
import { UsersModals } from "./ui/users-modals";

export const UsersWidget = () => {
  const initialSearchState = useInitialUsersSearchState();

  const { canDeleteUsers } = useRoleAccess();

  const { isArchived, setIsArchived, filtersKey } = useUserFilters({
    initialIsArchived: initialSearchState.isArchived,
  });

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: initialSearchState.page,
    initialLimit: initialSearchState.limit,
    resetPage: 0,
    resetKey: filtersKey,
  });

  useSyncUsersSearchParams({
    page,
    limit,
    isArchived,
  });

  const { users, total, hasUsers, emptyText, isLoading, isError } =
    useUsersQuery({ page, limit, isArchived });

  const { handleToggleArchive, handleDeleteUser } = useUserActions();

  const {
    isOpen: isModalOpen,
    editingItem: editingUser,
    openCreate: openCreateModal,
    openEdit: openEditModal,
    close: closeModal,
  } = useEntityModal<UserRow>();

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
