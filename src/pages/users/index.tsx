import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { UsersTable } from "@/features/users/ui/users-table";
import { getUsers } from "@/features/users/api";
import { Loader } from "@/shared/ui/loader";

const Users = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", { page: 1, limit: 10, isArchived: false }],
    queryFn: () => getUsers(1, 10, false),
  });

  if (isLoading) return <Loader />;
  if (isError)
    return <Alert severity="error">Ошибка при загрузке пользователей</Alert>;

  return (
    <Box>
      <UsersTable users={data} />
    </Box>
  );
};

export default Users;
