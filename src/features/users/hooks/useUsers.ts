import { usePagination } from "@/shared/hooks";
import { useUserActions } from "./useUserActions";
import { useUserFilters } from "./useUserFilters";
import { useUsersQuery } from "./useUsersQuery";

export const useUsers = () => {
  const { isArchived, setIsArchived, filtersKey } = useUserFilters();

  const { page, limit, setPage, setLimit } = usePagination({
    resetKey: filtersKey,
  });

  const {
    users,
    total,
    hasUsers,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useUsersQuery({ page, limit, isArchived });

  const { handleToggleArchive, handleDeleteUser } = useUserActions();

  return {
    users,
    total,
    hasUsers,
    emptyText,
    isLoading,
    isError,
    isFetching,

    page,
    limit,
    setPage,
    setLimit,

    isArchived,
    setIsArchived,

    handleToggleArchive,
    handleDeleteUser,
  };
};
