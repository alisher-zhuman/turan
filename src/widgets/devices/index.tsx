import { createDeviceColumns, useDevices } from "@/features/devices";
import { DevicesHeader } from "./ui/devices-header";
import { DevicesTableSection } from "./ui/devices-table-section";

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

  return (
    <DevicesTableSection
      isLoading={isLoading}
      isError={isError}
      hasDevices={hasDevices}
      emptyText={emptyText}
      devices={devices}
      columns={columns}
      page={page}
      limit={limit}
      total={total}
      onPageChange={setPage}
      onLimitChange={setLimit}
      toolbar={
        <DevicesHeader
          verified={verified}
          onChangeVerified={setVerified}
          selectedCount={selectedIds.length}
          onDeleteSelected={handleDeleteSelected}
        />
      }
    />
  );
};
