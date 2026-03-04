import { useCallback, useMemo } from "react";

import { useNavigate } from "react-router";

import {
  createGroupColumns,
  createGroupsSearchString,
  parseGroupsSearchState,
  useGroupActions,
  useGroupsQuery,
} from "@/features/groups";

import type { Group } from "@/entities/groups";

import { ERROR_TEXTS, ROUTES, ROWS_PER_PAGE_LABELS } from "@/shared/constants";
import {
  useEntityModal,
  useInitialSearchState,
  usePagination,
  useRoleAccess,
  useSyncSearchParams,
} from "@/shared/hooks";
import { TableSection } from "@/shared/ui/table-section";

import { GroupsActions } from "./ui/groups-actions";
import { GroupsModals } from "./ui/groups-modals";

export const GroupsWidget = () => {
  const initialSearchState = useInitialSearchState(parseGroupsSearchState);

  const navigate = useNavigate();

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: initialSearchState.page,
    initialLimit: initialSearchState.limit,
    resetPage: 0,
  });

  useSyncSearchParams({ page, limit }, createGroupsSearchString);

  const { isAdmin, canManageMetersToGroups } = useRoleAccess();

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
    isOpen: isModalOpen,
    editingItem: editingGroup,
    openCreate: openCreateModal,
    openEdit: openEditModal,
    close: closeModal,
  } = useEntityModal<Group>();

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
    () =>
      createGroupColumns(
        (group) => navigate(`/${ROUTES.METERS}?groupId=${group.id}`),
        handleOpenEditModal,
        handleDelete,
        isAdmin,
      ),
    [navigate, handleOpenEditModal, handleDelete, isAdmin],
  );

  const toolbar = <GroupsActions isAdmin={isAdmin} onCreate={handleOpenCreateModal} />;

  return (
    <>
      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText={ERROR_TEXTS.groups}
        hasItems={hasGroups}
        emptyText={emptyText}
        toolbar={toolbar}
        pagination={{
          page,
          limit,
          total,
          onPageChange: setPage,
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
