import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import type { Column } from "@/shared/types";

interface Props<T> {
  rows: T[];
  columns: Column<T>[];
  getRowId?: (row: T, index: number) => string | number;
}

export const DataTable = <T,>({ rows, columns, getRowId }: Props<T>) => (
  <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          {columns?.map(({ id, align, header }) => (
            <TableCell key={id} align={align ?? "left"}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rows?.map((row, index) => (
          <TableRow key={getRowId?.(row, index) ?? index}>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align ?? "left"}>
                {column.cell(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
