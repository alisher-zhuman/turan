import TablePagination from "@mui/material/TablePagination";

interface Props {
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  resetPageOnLimitChange?: boolean;
  rowsPerPageOptions?: number[];
  labelRowsPerPage?: string;
}

export const Pagination = ({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
  resetPageOnLimitChange = true,
  rowsPerPageOptions = [5, 10, 20],
  labelRowsPerPage = "На странице:",
}: Props) => (
  <TablePagination
    component="div"
    count={total}
    page={page}
    onPageChange={(_, newPage) => onPageChange(newPage)}
    rowsPerPage={limit}
    rowsPerPageOptions={rowsPerPageOptions}
    labelRowsPerPage={labelRowsPerPage}
    labelDisplayedRows={({ from, to, count }) =>
      `${from}-${to} из ${count !== -1 ? count : `более чем ${to}`}`
    }
    onRowsPerPageChange={(e) => {
      const nextLimit = parseInt(e.target.value, 10);

      onLimitChange(nextLimit);

      if (resetPageOnLimitChange) {
        onPageChange(0);
      }
    }}
  />
);
