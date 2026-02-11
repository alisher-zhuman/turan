import { usePagination } from "@/shared/hooks";
import { useReadingsAccess } from "./useReadingsAccess";
import { useReadingsActions } from "./useReadingsActions";
import { useReadingsQuery } from "./useReadingsQuery";
import { useReadingsSelection } from "./useReadingsSelection";

export const useReadings = () => {
  const { page, limit, setPage, setLimit } = usePagination({});

  const { isAdmin } = useReadingsAccess();

  const {
    readings,
    total,
    hasReadings,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useReadingsQuery({ page, limit });

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

  return {
    readings,
    total,
    hasReadings,
    emptyText,
    isLoading,
    isError,
    isFetching,

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
    handleDeleteSelected: handleDeleteSelectedWithIds,
  };
};
