import { useMemo, useState } from "react";

import {
  createReadingColumns,
  createReadingsSearchString,
  parseReadingsSearchState,
  ReadingsFiltersModal,
  useReadingsActions,
  useReadingsFilters,
  useReadingsQuery,
  useReadingsSelection,
} from "@/features/readings";

import { ROWS_PER_PAGE_LABELS } from "@/shared/constants";
import {
  useDebouncedValue,
  useInitialSearchState,
  usePagination,
  useRoleAccess,
  useSyncSearchParams,
} from "@/shared/hooks";
import { TableSection } from "@/shared/ui/table-section";

import { ReadingsActions } from "./ui/readings-actions";

export const ReadingsWidget = () => {
  const [isFiltersOpen, setFiltersOpen] = useState(false);

  const initialSearchState = useInitialSearchState(parseReadingsSearchState);

  const {
    filters,
    filtersKey,
    setMeterId,
    setCustomerId,
    setClient,
    setAddress,
    setDateFrom,
    setDateTo,
    resetFilters,
  } = useReadingsFilters({
    initialFilters: initialSearchState.filters,
  });

  const debouncedMeterId = useDebouncedValue(filters.meterId);
  const debouncedCustomerId = useDebouncedValue(filters.customerId);
  const debouncedClient = useDebouncedValue(filters.client);
  const debouncedAddress = useDebouncedValue(filters.address);

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: initialSearchState.page,
    initialLimit: initialSearchState.limit,
    resetPage: 0,
    resetKey: filtersKey,
  });

  useSyncSearchParams(
    {
      page,
      limit,
      meterId: filters.meterId,
      customerId: filters.customerId,
      client: filters.client,
      address: filters.address,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
    },
    createReadingsSearchString,
  );

  const { isAdmin } = useRoleAccess();

  const {
    readings,
    total,
    hasReadings,
    emptyText,
    isLoading,
    isError,
    errorText,
  } = useReadingsQuery({
      page,
      limit,
      filters: {
        meterId: debouncedMeterId,
        customerId: debouncedCustomerId,
        client: debouncedClient,
        address: debouncedAddress,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
      },
    });

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
    resetKey: [page, limit, filtersKey].join("|"),
  });

  const { handleDeleteOne, handleDeleteSelected } = useReadingsActions({
    isAdmin,
    onRemoved: removeSelected,
  });

  const handleDeleteSelectedWithIds = () => {
    handleDeleteSelected(selectedIds);
  };

  const handleResetFilters = () => {
    resetFilters();
    setPage(0);
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

  const toolbar = (
    <ReadingsActions
      isAdmin={isAdmin}
      selectedCount={selectedIds.length}
      onOpenFilters={() => setFiltersOpen(true)}
      onResetFilters={handleResetFilters}
      onDeleteSelected={handleDeleteSelectedWithIds}
    />
  );

  return (
    <>
      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText={errorText}
        hasItems={hasReadings}
        emptyText={emptyText}
        toolbar={toolbar}
        pagination={{
          page,
          limit,
          total,
          onPageChange: setPage,
          labelRowsPerPage: ROWS_PER_PAGE_LABELS.readings,
          onLimitChange: setLimit,
        }}
        rows={readings}
        columns={columns}
        getRowId={(r) => r.id}
      />

      <ReadingsFiltersModal
        open={isFiltersOpen}
        onClose={() => setFiltersOpen(false)}
        meterId={filters.meterId}
        onMeterIdChange={setMeterId}
        customerId={filters.customerId}
        onCustomerIdChange={setCustomerId}
        client={filters.client}
        onClientChange={setClient}
        address={filters.address}
        onAddressChange={setAddress}
        dateFrom={filters.dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={filters.dateTo}
        onDateToChange={setDateTo}
      />
    </>
  );
};
