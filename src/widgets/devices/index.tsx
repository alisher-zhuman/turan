import { useMemo } from "react";
import {
  createDeviceColumns,
  useDeviceActions,
  useDeviceFilters,
  useDeviceSelection,
  useDevicesQuery,
} from "@/features/devices";
import { usePagination } from "@/shared/hooks";
import { TableSection } from "@/shared/ui/table-section";
import { ERROR_TEXTS, ROWS_PER_PAGE_LABELS } from "@/shared/constants";
import { DevicesHeader } from "./ui/devices-header";

export const DevicesWidget = () => {
  const { verified, setVerified, filtersKey } = useDeviceFilters();

  const { page, limit, setPage, setLimit } = usePagination({
    resetKey: filtersKey,
  });

  const { devices, total, hasDevices, emptyText, isLoading, isError } =
    useDevicesQuery({ page, limit, verified });

  const {
    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,
    removeSelected,
  } = useDeviceSelection({
    devices,
    resetKey: [page, limit, verified].join("|"),
  });

  const { handleVerify, handleDeleteOne, handleDeleteSelected } =
    useDeviceActions({
      onRemoved: removeSelected,
    });

  const handleDeleteSelectedWithIds = () => {
    handleDeleteSelected(selectedIds);
  };

  const columns = useMemo(
    () =>
      createDeviceColumns({
        selectedIds,
        allSelected,
        isIndeterminate,
        onToggleAll: handleToggleAll,
        onToggleOne: handleToggleOne,
        onVerify: handleVerify,
        onDeleteOne: handleDeleteOne,
      }),
    [
      selectedIds,
      allSelected,
      isIndeterminate,
      handleToggleAll,
      handleToggleOne,
      handleVerify,
      handleDeleteOne,
    ],
  );

  return (
    <TableSection
      isLoading={isLoading}
      isError={isError}
      errorText={ERROR_TEXTS.devices}
      hasItems={hasDevices}
      emptyText={emptyText}
      toolbar={
        <DevicesHeader
          verified={verified}
          onChangeVerified={setVerified}
          selectedCount={selectedIds.length}
          onDeleteSelected={handleDeleteSelectedWithIds}
        />
      }
      pagination={{
        page,
        limit,
        total,
        onPageChange: setPage,
        rowsPerPageOptions: [5, 10, 20],
        labelRowsPerPage: ROWS_PER_PAGE_LABELS.devices,
        onLimitChange: setLimit,
      }}
      rows={devices}
      columns={columns}
      getRowId={(d) => d.id}
    />
  );
};
