import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useReadings } from "@/features/readings/hooks/useReadings";
import type { Reading } from "@/features/readings/interfaces";
import { createReadingColumns } from "@/features/readings/columns";
import { DataTable } from "@/shared/ui/data-table";
import { Loader } from "@/shared/ui/loader";
import { Pagination } from "@/shared/ui/pagination";

const Readings = () => {
  const {
    readings,
    total,
    hasReadings,
    emptyText,
    isLoading,
    isError,

    page,
    limit,
    setPage,
    setLimit,

    isAdmin,

    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,

    handleDeleteOne,
    handleDeleteSelected,
  } = useReadings();

  if (isLoading) {
    return <Loader />;
  }

  if (isError)
    return (
      <Alert severity="error">Ошибка при загрузке показаний водомеров</Alert>
    );

  const columns = createReadingColumns({
    isAdmin,
    selectedIds,
    allSelected,
    isIndeterminate,
    onToggleAll: handleToggleAll,
    onToggleOne: handleToggleOne,
    onDeleteOne: handleDeleteOne,
  });

  return (
    <Box>
      <Box mb={2} display="flex" alignItems="center" justifyContent="flex-end">
        {isAdmin && (
          <Button
            variant="outlined"
            color="error"
            disabled={selectedIds.length === 0}
            onClick={handleDeleteSelected}
          >
            Удалить выбранные
          </Button>
        )}
      </Box>

      {!hasReadings && (
        <Alert severity="info" sx={{ mt: 2 }}>
          {emptyText}
        </Alert>
      )}

      {hasReadings && (
        <>
          <DataTable
            rows={readings}
            columns={columns}
            getRowId={(r: Reading) => r.id}
          />

          <Pagination
            page={page}
            limit={limit}
            total={total}
            onPageChange={setPage}
            rowsPerPageOptions={[5, 10, 20]}
            labelRowsPerPage="Показаний на странице:"
            onRowsPerPageChange={(newLimit) => {
              setLimit(newLimit);
              setPage(0);
            }}
          />
        </>
      )}
    </Box>
  );
};

export default Readings;
