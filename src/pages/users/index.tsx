import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TablePagination from "@mui/material/TablePagination";
import { UsersTable } from "@/features/users/ui/users-table";
import { getUsers } from "@/features/users/api";
import type { GetUsersResponse } from "@/features/users/interfaces";
import { Loader } from "@/shared/ui/loader";

const Users = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isArchived, setIsArchived] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page, limit, isArchived],
    queryFn: () => getUsers(page + 1, limit, isArchived),
    staleTime: 5000,
    placeholderData: (prevData) => prevData,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return <Alert severity="error">Ошибка при загрузке пользователей</Alert>;

  return (
    <Box>
      <Box mb={2} display="flex" justifyContent="flex-end" gap={2}>
        <Select
          value={isArchived ? "archived" : "active"}
          onChange={(e) => setIsArchived(e.target.value === "archived")}
        >
          <MenuItem value="active">Активные</MenuItem>
          <MenuItem value="archived">Архивные</MenuItem>
        </Select>
      </Box>

      <UsersTable users={(data as GetUsersResponse).data} />

      <TablePagination
        component="div"
        count={data.total}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={limit}
        onRowsPerPageChange={(e) => {
          setLimit(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 20]}
        labelRowsPerPage="Строк на странице:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} из ${count !== -1 ? count : `более чем ${to}`}`
        }
      />
    </Box>
  );
};

export default Users;
