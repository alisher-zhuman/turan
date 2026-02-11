import { useMemo } from "react";
import {
  createReadingColumns,
  useReadingsAccess,
  useReadingsActions,
  useReadingsQuery,
  useReadingsSelection,
} from "@/features/readings";
import { usePagination } from "@/shared/hooks";
import { TableSection } from "@/shared/ui/table-section";
import { ERROR_TEXTS, ROWS_PER_PAGE_LABELS } from "@/shared/constants";
import { ReadingsHeader } from "./ui/readings-header";

export const ReadingsWidget = () => {
  const { page, limit, setPage, setLimit } = usePagination({});

  const { isAdmin } = useReadingsAccess();

  const { readings, total, hasReadings, emptyText, isLoading, isError } =
    useReadingsQuery({ page, limit });

  const {
    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,
    removeSelected,
  } = useReadingsSelection({
    readings,
    isAdmin,
    resetKey: [page, limit].join("|"),
  });

  const { handleDeleteOne, handleDeleteSelected } = useReadingsActions({
    isAdmin,
    onRemoved: removeSelected,
  });

  const handleDeleteSelectedWithIds = () => {
    handleDeleteSelected(selectedIds);
  };

  const columns = useMemo(
    () =>
      createReadingColumns({
        isAdmin,
        selectedIds,
        allSelected,
        isIndeterminate,
        onToggleAll: handleToggleAll,
        onToggleOne: handleToggleOne,
        onDeleteOne: handleDeleteOne,
      }),
    [
      isAdmin,
      selectedIds,
      allSelected,
      isIndeterminate,
      handleToggleAll,
      handleToggleOne,
      handleDeleteOne,
    ],
  );

  return (
    <TableSection
      isLoading={isLoading}
      isError={isError}
      errorText={ERROR_TEXTS.readings}
      hasItems={hasReadings}
      emptyText={emptyText}
      toolbar={
        <ReadingsHeader
          isAdmin={isAdmin}
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
        labelRowsPerPage: ROWS_PER_PAGE_LABELS.readings,
        onLimitChange: setLimit,
      }}
      rows={readings}
      columns={columns}
      getRowId={(r) => r.id}
    />
  );
};
