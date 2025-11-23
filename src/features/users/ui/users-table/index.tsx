import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { User } from "@/features/authentication/interfaces/auth";
import { ROLE_LABELS } from "@/shared/utils/constants";

interface Props {
  users: Omit<User, "company" | "devices">[];
  onEdit?: (user: Omit<User, "company" | "devices">) => void;
  onDelete?: (userId: number) => void;
}

export const UsersTable = ({ users, onEdit, onDelete }: Props) => {
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
            <TableCell align="right">Действия</TableCell>
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
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <IconButton color="primary" onClick={() => onEdit?.(user)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton color="error" onClick={() => onDelete?.(id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
