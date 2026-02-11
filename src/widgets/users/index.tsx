import { createUserColumns, useUsers } from "@/features/users";
import { useAuthStore } from "@/shared/stores";
import { canDeleteUsers } from "@/shared/helpers";
import { UsersHeader } from "./ui/users-header";
import { UsersModals } from "./ui/users-modals";
import { UsersTableSection } from "./ui/users-table-section";
import { useUsersUiState } from "./hooks/useUsersUiState";

export const UsersWidget = () => {
  const { user } = useAuthStore();

  const {
    users,
    total,
    hasUsers,
    emptyText,
    isLoading,
    isError,
    page,
    limit,
    setPage,
    setLimit,
    isArchived,
    setIsArchived,
    handleToggleArchive,
    handleDeleteUser,
  } = useUsers();

  const {
    isModalOpen,
    editingUser,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useUsersUiState();

  const canDelete = canDeleteUsers(user?.role);

  const columns = createUserColumns(
    handleToggleArchive,
    openEditModal,
    canDelete,
    handleDeleteUser,
  );

  return (
    <>
      <UsersTableSection
        isLoading={isLoading}
        isError={isError}
        hasUsers={hasUsers}
        emptyText={emptyText}
        users={users}
        columns={columns}
        page={page}
        limit={limit}
        total={total}
        onPageChange={setPage}
        onLimitChange={setLimit}
        toolbar={
          <UsersHeader
            isArchived={isArchived}
            onChangeArchived={setIsArchived}
            onCreate={openCreateModal}
          />
        }
      />

      <UsersModals
        isOpen={isModalOpen}
        editingUser={editingUser}
        onClose={closeModal}
      />
    </>
  );
};
