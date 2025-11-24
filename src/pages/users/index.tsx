import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { UsersTable } from "@/features/users/ui/users-table";
import { CreateUserForm } from "@/features/users/ui/create-user-form";
import { getUsers } from "@/features/users/api";
import { Loader } from "@/shared/ui/loader";
import { Modal } from "@/shared/ui/modal";
import { Pagination } from "@/shared/ui/pagination";

const Users = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isArchived, setIsArchived] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page, limit, isArchived],
    queryFn: () => getUsers(page + 1, limit, isArchived),
    staleTime: 5000,
    placeholderData: (prevData) => prevData,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return <Alert severity="error">Ошибка при загрузке пользователей</Alert>;

  const toggleModal = () => setModalOpen((prev) => !prev);

  const hasUsers = data?.data?.length > 0;

  const emptyText = isArchived
    ? "Нет архивных пользователей"
    : "Нет активных пользователей";

  return (
    <>
      <Box>
        <Box mb={2} display="flex" justifyContent="flex-end" gap={2}>
          <Select
            sx={{ maxHeight: 36 }}
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
            <UsersTable users={data.data} />

            <Pagination
              page={page}
              limit={limit}
              total={data.total}
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
        onClose={toggleModal}
        title="Создать пользователя"
      >
        <CreateUserForm onClose={toggleModal} />
      </Modal>
    </>
  );
};

export default Users;
