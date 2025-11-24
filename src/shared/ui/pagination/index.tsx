import TablePagination from "@mui/material/TablePagination";

interface Props {
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newLimit: number) => void;
  rowsPerPageOptions?: number[];
  labelRowsPerPage?: string;
}

export const Pagination = ({
  page,
  limit,
  total,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 20],
  labelRowsPerPage = "На странице:",
}: Props) => (
  <TablePagination
    component="div"
    count={total}
    page={page}
    onPageChange={(_, newPage) => onPageChange(newPage)}
    rowsPerPage={limit}
    onRowsPerPageChange={(e) =>
      onRowsPerPageChange(parseInt(e.target.value, 10))
    }
    rowsPerPageOptions={rowsPerPageOptions}
    labelRowsPerPage={labelRowsPerPage}
    labelDisplayedRows={({ from, to, count }) =>
      `${from}-${to} из ${count !== -1 ? count : `более чем ${to}`}`
    }
  />
);
