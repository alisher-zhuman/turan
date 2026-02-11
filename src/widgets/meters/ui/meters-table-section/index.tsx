import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import type { Column } from "@/shared/types";
import type { Meter } from "@/entities/meters";
import { DataTable } from "@/shared/ui/data-table";
import { Loader } from "@/shared/ui/loader";
import { Pagination } from "@/shared/ui/pagination";
import { ROWS_PER_PAGE_LABELS } from "@/shared/constants";

interface Props {
  isLoading: boolean;
  isError: boolean;
  hasMeters: boolean;
  emptyText: string;
  meters: Meter[];
  columns: Column<Meter>[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
}

export const MetersTableSection = ({
  isLoading,
  isError,
  hasMeters,
  emptyText,
  meters,
  columns,
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: Props) => {
  if (isError) return null;

  if (isLoading) {
    return (
      <Box mt={2}>
        <Loader />
      </Box>
    );
  }

  if (!hasMeters) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        {emptyText}
      </Alert>
    );
  }

  return (
    <>
      <DataTable rows={meters} columns={columns} getRowId={(m) => m.id} />

      <Pagination
        page={page}
        limit={limit}
        total={total}
        onPageChange={onPageChange}
        rowsPerPageOptions={[5, 10, 20]}
        labelRowsPerPage={ROWS_PER_PAGE_LABELS.meters}
        onLimitChange={onLimitChange}
      />
    </>
  );
};
