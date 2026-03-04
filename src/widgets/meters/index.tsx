import { useMemo } from "react";

import { useGroupActions, useGroupsQuery } from "@/features/groups";
import {
  createMeterColumns,
  createMetersSearchString,
  MetersActions,
  parseMeterSearchState,
  useMeters,
} from "@/features/meters";

import { ERROR_TEXTS, ROWS_PER_PAGE_LABELS } from "@/shared/constants";
import { useInitialSearchState, useSyncSearchParams } from "@/shared/hooks";
import { TableSection } from "@/shared/ui/table-section";

import { useMetersUiState } from "./hooks/useMetersUiState";
import { MetersModals } from "./ui/meters-modals";

export const MetersWidget = () => {
  const initialSearchState = useInitialSearchState(parseMeterSearchState);

  const {
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,
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
    handleDeleteSelected,
    handleCommand,
    handleResetFilters,
    clearSelection,
  } = useMeters({
    initialFilters: initialSearchState.filters,
    initialPage: initialSearchState.page,
    initialLimit: initialSearchState.limit,
  });

  useSyncSearchParams(
    {
      page,
      limit,
      status,
      isArchived,
      groupId,
      customerId,
      meterName,
      valveFilter,
    },
    createMetersSearchString,
  );

  const { groups } = useGroupsQuery({
    page: 0,
    limit: 0,
    forFilter: true,
  });

  const { handleAddMetersToGroup, handleRemoveMetersFromGroup } =
    useGroupActions({
      isAdmin,
      canManageMetersToGroups,
    });

  const {
    editingMeter,
    isEditModalOpen,
    detailsMeter,
    isDetailsOpen,
    isFiltersOpen,
    groupModalOpen,
    groupModalMode,
    groupModalGroupId,
    setGroupModalGroupId,
    setFiltersOpen,
    handleCreate,
    handleEdit,
    handleView,
    closeEditModal,
    closeDetailsModal,
    openAddToGroupModal,
    openRemoveFromGroupModal,
    closeGroupModal,
    handleConfirmGroupModal,
  } = useMetersUiState({
    isAdmin,
    canEdit,
    canManageMetersToGroups,
    selectedIds,
    groups,
    groupId,
    onAddMetersToGroup: handleAddMetersToGroup,
    onRemoveMetersFromGroup: handleRemoveMetersFromGroup,
    onClearSelection: clearSelection,
  });

  const columns = useMemo(
    () =>
      createMeterColumns({
        isAdmin,
        canEdit,
        canManageMetersToGroups,
        selectedIds,
        allSelected,
        isIndeterminate,
        onToggleAll: handleToggleAll,
        onToggleOne: handleToggleOne,
        onEdit: handleEdit,
        onDeleteOne: handleDeleteOne,
        onCommand: handleCommand,
        onView: handleView,
      }),
    [
      isAdmin,
      canEdit,
      canManageMetersToGroups,
      selectedIds,
      allSelected,
      isIndeterminate,
      handleToggleAll,
      handleToggleOne,
      handleEdit,
      handleDeleteOne,
      handleCommand,
      handleView,
    ],
  );

  const toolbar = (
    <MetersActions
      isAdmin={isAdmin}
      canManageMetersToGroups={canManageMetersToGroups}
      selectedCount={selectedIds.length}
      hasGroups={groups.length > 0}
      onCreate={handleCreate}
      onOpenFilters={() => setFiltersOpen(true)}
      onDeleteSelected={handleDeleteSelected}
      onAddSelectedToGroup={openAddToGroupModal}
      onRemoveSelectedFromGroup={openRemoveFromGroupModal}
      onResetFilters={handleResetFilters}
    />
  );

  return (
    <>
      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText={ERROR_TEXTS.meters}
        hasItems={hasMeters}
        emptyText={emptyText}
        toolbar={toolbar}
        rows={meters}
        columns={columns}
        getRowId={(m) => m.id}
        pagination={{
          page,
          limit,
          total,
          onPageChange: setPage,
          labelRowsPerPage: ROWS_PER_PAGE_LABELS.meters,
          onLimitChange: setLimit,
        }}
      />

      <MetersModals
        editOpen={isEditModalOpen}
        editingMeter={editingMeter}
        onCloseEdit={closeEditModal}
        canArchive={isAdmin}
        detailsOpen={isDetailsOpen}
        detailsMeter={detailsMeter}
        onCloseDetails={closeDetailsModal}
        groupModalOpen={groupModalOpen}
        groupModalMode={groupModalMode}
        groups={groups}
        selectedCount={selectedIds.length}
        selectedGroupId={groupModalGroupId}
        onChangeGroup={setGroupModalGroupId}
        onCloseGroupModal={closeGroupModal}
        onConfirmGroupModal={handleConfirmGroupModal}
        filtersOpen={isFiltersOpen}
        onCloseFilters={() => setFiltersOpen(false)}
        status={status}
        onStatusChange={setStatus}
        valveFilter={valveFilter}
        onValveFilterChange={setValveFilter}
        isArchived={isArchived}
        onArchivedChange={setIsArchived}
        groupId={groupId}
        onGroupChange={setGroupId}
        customerId={customerId}
        onCustomerIdChange={setCustomerId}
        meterName={meterName}
        onMeterNameChange={setMeterName}
      />
    </>
  );
};
