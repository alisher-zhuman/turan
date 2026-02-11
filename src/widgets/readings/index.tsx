import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useReadings, createReadingColumns } from "@/features/readings";
import type { Reading } from "@/entities/readings";
import { DataTable } from "@/shared/ui/data-table";
import { Pagination } from "@/shared/ui/pagination";
import { ListSection } from "@/shared/ui/list-section";

export const ReadingsWidget = () => {
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

  const columns = createReadingColumns({
    isAdmin,
    selectedIds,
    allSelected,
    isIndeterminate,
    onToggleAll: handleToggleAll,
    onToggleOne: handleToggleOne,
    onDeleteOne: handleDeleteOne,
  });

  const toolbar = (
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
  );

  const pagination = (
    <Pagination
      page={page}
      limit={limit}
      total={total}
      onPageChange={setPage}
      rowsPerPageOptions={[5, 10, 20]}
      labelRowsPerPage="Показаний на странице:"
      onLimitChange={setLimit}
    />
  );

  return (
    <ListSection
      isLoading={isLoading}
      isError={isError}
      errorText="Ошибка при загрузке показаний водомеров"
      hasItems={hasReadings}
      emptyText={emptyText}
      toolbar={toolbar}
      pagination={pagination}
    >
      <DataTable
        rows={readings}
        columns={columns}
        getRowId={(r: Reading) => r.id}
      />
    </ListSection>
  );
};
