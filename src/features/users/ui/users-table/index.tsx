import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import type { User } from "@/features/authentication/interfaces/auth";
import { ROLE_LABELS } from "@/shared/utils/constants";

interface Props {
  users: Omit<User, "company" | "devices">[];
}

export const UsersTable = ({ users }: Props) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Почта</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Фамилия</TableCell>
            <TableCell>Роль</TableCell>
            <TableCell>Создан</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => {
            const { id, email, firstName, lastName, role, createdAt } = user;

            return (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{firstName}</TableCell>
                <TableCell>{lastName}</TableCell>
                <TableCell>{ROLE_LABELS[role]}</TableCell>
                <TableCell>
                  {new Date(createdAt).toLocaleString("ru-RU")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
