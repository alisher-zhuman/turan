import { usePagination } from "@/shared/hooks";
import { useGroupAccess } from "./useGroupAccess";
import { useGroupActions } from "./useGroupActions";
import { useGroupsQuery } from "./useGroupsQuery";

interface Props {
  forFilter?: boolean;
}

export const useGroups = ({ forFilter = false }: Props) => {
  const { page, limit, setPage, setLimit } = usePagination({});

  const { isAdmin, canManageMetersToGroups } = useGroupAccess();

  const {
    groups,
    total,
    hasGroups,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useGroupsQuery({ page, limit, forFilter });

  const {
    handleDelete,
    handleAddMetersToGroup,
    handleRemoveMetersFromGroup,
  } = useGroupActions({
    isAdmin,
    canManageMetersToGroups,
  });

  return {
    groups,
    total,
    hasGroups,
    emptyText,
    isLoading,
    isError,
    isFetching,

    page,
    limit,
    setPage,
    setLimit,

    isAdmin,
    handleDelete,

    handleAddMetersToGroup,
    handleRemoveMetersFromGroup,
  };
};
