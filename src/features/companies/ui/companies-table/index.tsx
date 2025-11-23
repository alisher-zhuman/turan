import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import type { Company } from "@/shared/interfaces/companies";
import { copyToClipboard } from "@/shared/utils/helpers";

interface Props {
  companies: Company[];
  onRefreshToken: (companyId: number) => void;
}

export const CompaniesTable = ({ companies, onRefreshToken }: Props) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Адрес</TableCell>
            <TableCell>API ключ</TableCell>
            <TableCell>Создано</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {companies.map(({ id, name, address, key, createdAt }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell>
                {key ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => copyToClipboard(key.key)}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>

                    <IconButton size="small" onClick={() => onRefreshToken(id)}>
                      <RefreshIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  "Нет API ключа"
                )}
              </TableCell>
              <TableCell>
                {new Date(createdAt).toLocaleString("ru-RU")}
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
