import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import { useUsers } from "@/features/users/hooks/useUsers";
import { useAuthStore } from "@/features/authentication/store/auth";
import { UserForm } from "@/features/users/ui/user-form";
import { createUserColumns } from "@/features/users/columns";
import type { UserRow } from "@/features/users/types";
import { Loader } from "@/shared/ui/loader";
import { Modal } from "@/shared/ui/modal";
import { Pagination } from "@/shared/ui/pagination";
import { DataTable } from "@/shared/ui/data-table";

const Users = () => {
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

  if (isLoading) {
    return <Loader />;
  }

  if (isError)
    return <Alert severity="error">Ошибка при загрузке пользователей</Alert>;

  const toggleModal = () => setModalOpen((prev) => !prev);

  const openEditModal = (user: UserRow) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setModalOpen(false);
  };

  const canDelete = user?.role === "admin" || user?.role === "super_admin";

  const columns = createUserColumns(
    handleToggleArchive,
    openEditModal,
    canDelete,
    handleDeleteUser,
  );

  return (
    <>
      <Box>
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
            onChange={(e) => {
              setIsArchived(e.target.value === "archived");
              setPage(0);
            }}
          >
            <MenuItem value="active">Активные</MenuItem>
            <MenuItem value="archived">Архивные</MenuItem>
          </Select>

          <Button onClick={toggleModal} variant="contained" color="primary">
            Создать
          </Button>
        </Box>

        {!hasUsers && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {emptyText}
          </Alert>
        )}

        {hasUsers && (
          <>
            <DataTable
              rows={users}
              columns={columns}
              getRowId={(user: UserRow) => user.id}
            />

            <Pagination
              page={page}
              limit={limit}
              total={total}
              onPageChange={setPage}
              rowsPerPageOptions={[5, 10, 20]}
              labelRowsPerPage="Пользователей на странице:"
              onRowsPerPageChange={(newLimit) => {
                setLimit(newLimit);
                setPage(0);
              }}
            />
          </>
        )}
      </Box>

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

export default Users;
