import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Device } from "../../interfaces";

interface Props {
  devices: Device[];
  onVerify: (deviceId: number) => void;
  onDelete: (deviceId: number) => void;
}

export const DevicesTable = ({ devices, onVerify, onDelete }: Props) => (
  <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Device ID</TableCell>
          <TableCell>Создан</TableCell>
          <TableCell align="right">Действия</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {devices.map((device) => {
          const { id, deviceId, createdAt, verified } = device;

          return (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{deviceId}</TableCell>
              <TableCell>
                {new Date(createdAt).toLocaleString("ru-RU")}
              </TableCell>
              <TableCell align="right">
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  {!verified && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => onVerify(id)}
                    >
                      Подтвердить
                    </Button>
                  )}

                  <IconButton color="error" onClick={() => onDelete(id)}>
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
