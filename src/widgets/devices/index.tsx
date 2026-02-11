import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { createDeviceColumns, useDevices } from "@/features/devices";
import type { Device } from "@/entities/devices";
import { DataTable } from "@/shared/ui/data-table";
import { Pagination } from "@/shared/ui/pagination";
import { ListSection } from "@/shared/ui/list-section";

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

  const columns = createDeviceColumns({
    selectedIds,
    allSelected,
    isIndeterminate,
    onToggleAll: handleToggleAll,
    onToggleOne: handleToggleOne,
    onVerify: handleVerify,
    onDeleteOne: handleDeleteOne,
  });

  const toolbar = (
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
        onChange={(e) => setVerified(e.target.value === "verified")}
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
  );

  const pagination = (
    <Pagination
      page={page}
      limit={limit}
      total={total}
      onPageChange={setPage}
      rowsPerPageOptions={[5, 10, 20]}
      labelRowsPerPage="Устройств на странице:"
      onLimitChange={setLimit}
    />
  );

  return (
    <ListSection
      isLoading={isLoading}
      isError={isError}
      errorText="Ошибка при загрузке устройств"
      hasItems={hasDevices}
      emptyText={emptyText}
      toolbar={toolbar}
      pagination={pagination}
    >
      <DataTable
        rows={devices}
        columns={columns}
        getRowId={(d: Device) => d.id}
      />
    </ListSection>
  );
};
