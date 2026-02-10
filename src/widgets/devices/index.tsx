import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { createDeviceColumns, useDevices } from "@/features/devices";
import { DataTable } from "@/shared/ui/data-table";
import { Loader } from "@/shared/ui/loader";
import { Pagination } from "@/shared/ui/pagination";
import type { Device } from "@/shared/types";

export const DevicesWidget = () => {
  const {
    devices,
    total,
    hasDevices,
    emptyText,
    isLoading,
    isError,
    page,
    limit,
    setPage,
    setLimit,
    verified,
    setVerified,
    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,
    handleVerify,
    handleDeleteOne,
    handleDeleteSelected,
  } = useDevices();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Alert severity="error">Ошибка при загрузке устройств</Alert>;
  }

  const columns = createDeviceColumns({
    selectedIds,
    allSelected,
    isIndeterminate,
    onToggleAll: handleToggleAll,
    onToggleOne: handleToggleOne,
    onVerify: handleVerify,
    onDeleteOne: handleDeleteOne,
  });

  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Select
          sx={{ maxHeight: 38 }}
          value={verified ? "verified" : "unverified"}
          onChange={(e) => {
            setVerified(e.target.value === "verified");
            setPage(0);
          }}
        >
          <MenuItem value="unverified">Неподтверждённые</MenuItem>
          <MenuItem value="verified">Подтверждённые</MenuItem>
        </Select>

        <Button
          variant="outlined"
          color="error"
          disabled={selectedIds.length === 0}
          onClick={handleDeleteSelected}
        >
          Удалить выбранные
        </Button>
      </Box>

      {!hasDevices && (
        <Alert severity="info" sx={{ mt: 2 }}>
          {emptyText}
        </Alert>
      )}

      {hasDevices && (
        <>
          <DataTable
            rows={devices}
            columns={columns}
            getRowId={(d: Device) => d.id}
          />

          <Pagination
            page={page}
            limit={limit}
            total={total}
            onPageChange={setPage}
            rowsPerPageOptions={[5, 10, 20]}
            labelRowsPerPage="Устройств на странице:"
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
