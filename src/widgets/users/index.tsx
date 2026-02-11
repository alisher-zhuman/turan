import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { createUserColumns, UserForm, useUsers } from "@/features/users";
import type { UserRow } from "@/entities/users";
import { useAuthStore } from "@/shared/stores";
import { Modal } from "@/shared/ui/modal";
import { Pagination } from "@/shared/ui/pagination";
import { DataTable } from "@/shared/ui/data-table";
import { canDeleteUsers } from "@/shared/helpers";
import { ListSection } from "@/shared/ui/list-section";

export const UsersWidget = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRow | null>(null);

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

  const toggleModal = () => setModalOpen((prev) => !prev);

  const openEditModal = (user: UserRow) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setModalOpen(false);
  };

  const canDelete = canDeleteUsers(user?.role);

  const columns = createUserColumns(
    handleToggleArchive,
    openEditModal,
    canDelete,
    handleDeleteUser,
  );

  const toolbar = (
    <Box
      mb={2}
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      gap={2}
    >
      <Select
        sx={{ maxHeight: 38 }}
        value={isArchived ? "archived" : "active"}
        onChange={(e) => setIsArchived(e.target.value === "archived")}
      >
        <MenuItem value="active">Активные</MenuItem>
        <MenuItem value="archived">Архивные</MenuItem>
      </Select>

      <Button onClick={toggleModal} variant="contained" color="primary">
        Создать
      </Button>
    </Box>
  );

  const pagination = (
    <Pagination
      page={page}
      limit={limit}
      total={total}
      onPageChange={setPage}
      rowsPerPageOptions={[5, 10, 20]}
      labelRowsPerPage="Пользователей на странице:"
      onLimitChange={setLimit}
    />
  );

  return (
    <>
      <ListSection
        isLoading={isLoading}
        isError={isError}
        errorText="Ошибка при загрузке пользователей"
        hasItems={hasUsers}
        emptyText={emptyText}
        toolbar={toolbar}
        pagination={pagination}
      >
        <DataTable
          rows={users}
          columns={columns}
          getRowId={(user: UserRow) => user.id}
        />
      </ListSection>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={
          editingUser ? "Редактировать пользователя" : "Создать пользователя"
        }
      >
        <UserForm onClose={closeModal} userToEdit={editingUser} />
      </Modal>
    </>
  );
};
