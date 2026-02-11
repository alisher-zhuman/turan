import { useCallback, useMemo } from "react";
import {
  createGroupColumns,
  useGroupAccess,
  useGroupActions,
  useGroupsQuery,
} from "@/features/groups";
import { usePagination } from "@/shared/hooks";
import { TableSection } from "@/shared/ui/table-section";
import { ERROR_TEXTS, ROWS_PER_PAGE_LABELS } from "@/shared/constants";
import { GroupsHeader } from "./ui/groups-header";
import { GroupsModals } from "./ui/groups-modals";
import { useGroupsUiState } from "./hooks/useGroupsUiState";

export const GroupsWidget = () => {
  const { page, limit, setPage, setLimit } = usePagination({});

  const { isAdmin, canManageMetersToGroups } = useGroupAccess();

  const { groups, total, hasGroups, emptyText, isLoading, isError } =
    useGroupsQuery({
      page,
      limit,
      forFilter: false,
    });

  const { handleDelete } = useGroupActions({
    isAdmin,
    canManageMetersToGroups,
  });

  const {
    isModalOpen,
    editingGroup,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useGroupsUiState();

  const handleOpenCreateModal = useCallback(() => {
    if (!isAdmin) return;
    openCreateModal();
  }, [isAdmin, openCreateModal]);

  const handleOpenEditModal = useCallback(
    (group: (typeof groups)[number]) => {
      if (!isAdmin) return;
      openEditModal(group);
    },
    [isAdmin, openEditModal],
  );

  const columns = useMemo(
    () => createGroupColumns(handleOpenEditModal, handleDelete, isAdmin),
    [handleOpenEditModal, handleDelete, isAdmin],
  );

  return (
    <>
      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText={ERROR_TEXTS.groups}
        hasItems={hasGroups}
        emptyText={emptyText}
        toolbar={
          <GroupsHeader isAdmin={isAdmin} onCreate={handleOpenCreateModal} />
        }
        pagination={{
          page,
          limit,
          total,
          onPageChange: setPage,
          rowsPerPageOptions: [5, 10, 20],
          labelRowsPerPage: ROWS_PER_PAGE_LABELS.groups,
          onLimitChange: setLimit,
        }}
        rows={groups}
        columns={columns}
        getRowId={(g) => g.id}
      />

      <GroupsModals
        isOpen={isModalOpen}
        editingGroup={editingGroup}
        onClose={closeModal}
      />
    </>
  );
};
