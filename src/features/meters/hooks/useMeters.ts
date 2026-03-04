import { useDebouncedValue, usePagination, useRoleAccess } from "@/shared/hooks";

import { useMeterActions } from "./useMeterActions";
import { type MeterFilters, useMeterFilters } from "./useMeterFilters";
import { useMeterSelection } from "./useMeterSelection";
import { useMetersQuery } from "./useMetersQuery";

interface Params {
  initialFilters?: Partial<MeterFilters>;
  initialPage?: number;
  initialLimit?: number;
}

export const useMeters = ({
  initialFilters,
  initialPage = 0,
  initialLimit = 10,
}: Params = {}) => {
  const {
    filters,
    filtersKey,
    setStatus,
    setIsArchived,
    setGroupId,
    setCustomerId,
    setMeterName,
    setValveFilter,
    resetFilters,
  } = useMeterFilters({ initialFilters });

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage,
    initialLimit,
    resetPage: 0,
    resetKey: filtersKey,
  });

  const {
    isAdmin,
    canEditMeters: canEdit,
    canManageMetersToGroups,
  } = useRoleAccess();

  const debouncedCustomerId = useDebouncedValue(filters.customerId);
  const debouncedMeterName = useDebouncedValue(filters.meterName);

  const { status, isArchived, groupId, valveFilter } = filters;

  const {
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useMetersQuery({
    page,
    limit,
    filters: {
      ...filters,
      customerId: debouncedCustomerId,
      meterName: debouncedMeterName,
    },
  });

  const {
    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,
    clearSelection,
    removeSelected,
  } = useMeterSelection({
    meters,
    canManageMetersToGroups,
    resetKey: [page, limit, filtersKey].join("|"),
  });

  const { handleDeleteOne, handleDeleteSelected, handleCommand } =
    useMeterActions({
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

  return {
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,
    isFetching,

    page,
    limit,
    setPage,
    setLimit,

    status,
    setStatus,
    isArchived,
    setIsArchived,

    valveFilter,
    setValveFilter,

    groupId,
    setGroupId,

    customerId: filters.customerId,
    setCustomerId,
    meterName: filters.meterName,
    setMeterName,

    isAdmin,
    canEdit,
    canManageMetersToGroups,

    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,
    handleDeleteOne,
    handleDeleteSelected: handleDeleteSelectedWithIds,
    handleCommand,
    handleResetFilters,
    clearSelection,
  };
};
