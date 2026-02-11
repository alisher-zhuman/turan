import { usePagination } from "@/shared/hooks";
import { useDeviceActions } from "./useDeviceActions";
import { useDeviceFilters } from "./useDeviceFilters";
import { useDeviceSelection } from "./useDeviceSelection";
import { useDevicesQuery } from "./useDevicesQuery";

export const useDevices = () => {
  const { verified, setVerified, filtersKey } = useDeviceFilters();

  const { page, limit, setPage, setLimit } = usePagination({
    resetKey: filtersKey,
  });

  const {
    devices,
    total,
    hasDevices,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useDevicesQuery({ page, limit, verified });

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

  return {
    devices,
    total,
    hasDevices,
    emptyText,
    isLoading,
    isError,
    isFetching,

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
    handleDeleteSelected: handleDeleteSelectedWithIds,
  };
};
