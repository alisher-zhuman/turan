import { usePagination } from "@/shared/hooks";
import { useMeterAccess } from "./useMeterAccess";
import { useMeterActions } from "./useMeterActions";
import { useMeterFilters } from "./useMeterFilters";
import { useMeterSelection } from "./useMeterSelection";
import { useMetersQuery } from "./useMetersQuery";

export const useMeters = () => {
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
  } = useMeterFilters();

  const { page, limit, setPage, setLimit } = usePagination({
    resetKey: filtersKey,
  });

  const { isAdmin, canEdit, canManageMetersToGroups } = useMeterAccess();

  const { status, isArchived, groupId, customerId, meterName, valveFilter } =
    filters;

  const {
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useMetersQuery({ page, limit, filters });

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

    customerId,
    setCustomerId,
    meterName,
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
