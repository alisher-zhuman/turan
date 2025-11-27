import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import { UserForm } from "@/features/users/ui/user-form";
import { getUsers, archiveUser, unarchiveUser } from "@/features/users/api";
import type { User } from "@/features/authentication/interfaces/auth";
import { Loader } from "@/shared/ui/loader";
import { Modal } from "@/shared/ui/modal";
import { Pagination } from "@/shared/ui/pagination";
import { DataTable } from "@/shared/ui/data-table";
import { createUserColumns } from "@/features/users/columns";

const Users = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isArchived, setIsArchived] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Omit<
    User,
    "company" | "devices"
  > | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page, limit, isArchived],
    queryFn: () => getUsers(page + 1, limit, isArchived),
    staleTime: 5000,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError)
    return <Alert severity="error">Ошибка при загрузке пользователей</Alert>;

  const toggleModal = () => setModalOpen((prev) => !prev);

  const openEditModal = (user: Omit<User, "company" | "devices">) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setModalOpen(false);
  };

  const handleToggleArchive = async (userId: number, archived: boolean) => {
    try {
      if (archived) {
        await unarchiveUser(userId);
        toast.success("Пользователь разархивирован");
      } else {
        await archiveUser(userId);
        toast.success("Пользователь архивирован");
      }

      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при изменении статуса пользователя"
      );
    }
  };

  const hasUsers = data?.data?.length > 0;
  const emptyText = isArchived
    ? "Нет архивных пользователей"
    : "Нет активных пользователей";

  const columns = createUserColumns(handleToggleArchive, openEditModal);

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
            onChange={(e) => setIsArchived(e.target.value === "archived")}
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
              rows={data.data ?? []}
              columns={columns}
              getRowId={(user) => user.id}
            />

            <Pagination
              page={page}
              limit={limit}
              total={data.total ?? 0}
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
