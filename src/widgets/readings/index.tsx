import { useReadings, createReadingColumns } from "@/features/readings";
import { ReadingsHeader } from "./ui/readings-header";
import { ReadingsTableSection } from "./ui/readings-table-section";

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

  return (
    <ReadingsTableSection
      isLoading={isLoading}
      isError={isError}
      hasReadings={hasReadings}
      emptyText={emptyText}
      readings={readings}
      columns={columns}
      page={page}
      limit={limit}
      total={total}
      onPageChange={setPage}
      onLimitChange={setLimit}
      toolbar={
        <ReadingsHeader
          isAdmin={isAdmin}
          selectedCount={selectedIds.length}
          onDeleteSelected={handleDeleteSelected}
        />
      }
    />
  );
};
