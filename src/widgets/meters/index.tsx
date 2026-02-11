import Box from "@mui/material/Box";
import {
  createMeterColumns,
  useMeters,
} from "@/features/meters";
import { useGroups } from "@/features/groups";
import { MetersHeader } from "./ui/meters-header";
import { MetersModals } from "./ui/meters-modals";
import { MetersTableSection } from "./ui/meters-table-section";
import { useMetersUiState } from "./hooks/useMetersUiState";

export const MetersWidget = () => {
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
  } = useMeters();

  const { groups, handleAddMetersToGroup, handleRemoveMetersFromGroup } =
    useGroups({
      forFilter: true,
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
    handleEdit,
    handleView,
    closeEditModal,
    closeDetailsModal,
    openAddToGroupModal,
    openRemoveFromGroupModal,
    closeGroupModal,
    handleConfirmGroupModal,
  } = useMetersUiState({
    canEdit,
    canManageMetersToGroups,
    selectedIds,
    groups,
    groupId,
    onAddMetersToGroup: handleAddMetersToGroup,
    onRemoveMetersFromGroup: handleRemoveMetersFromGroup,
    onClearSelection: clearSelection,
  });

  const columns = createMeterColumns({
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
  });

  return (
    <>
      <Box>
        <MetersHeader
          isError={isError}
          isAdmin={isAdmin}
          canManageMetersToGroups={canManageMetersToGroups}
          selectedCount={selectedIds.length}
          hasGroups={groups.length > 0}
          onOpenFilters={() => setFiltersOpen(true)}
          onDeleteSelected={handleDeleteSelected}
          onAddSelectedToGroup={openAddToGroupModal}
          onRemoveSelectedFromGroup={openRemoveFromGroupModal}
          onResetFilters={handleResetFilters}
        />

        <MetersTableSection
          isLoading={isLoading}
          isError={isError}
          hasMeters={hasMeters}
          emptyText={emptyText}
          meters={meters}
          columns={columns}
          page={page}
          limit={limit}
          total={total}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      </Box>

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
