import { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useMeters } from "@/features/meters/hooks/useMeters";
import { useGroups } from "@/features/groups/hooks/useGroups";
import { createMeterColumns } from "@/features/meters/columns";
import { MeterForm } from "@/features/meters/ui/meter-form";
import { MeterDetails } from "@/features/meters/ui/meter-details";
import { MetersActions } from "@/features/meters/ui/meters-actions";
import { MeterGroupModal } from "@/features/meters/ui/meter-group-modal";
import { MetersFiltersModal } from "@/features/meters/ui/meters-filters-modal";
import type { Meter } from "@/features/meters/interfaces";
import { DataTable } from "@/shared/ui/data-table";
import { Loader } from "@/shared/ui/loader";
import { Pagination } from "@/shared/ui/pagination";
import { Modal } from "@/shared/ui/modal";

const Meters = () => {
  const [editingMeter, setEditingMeter] = useState<Meter | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [detailsMeter, setDetailsMeter] = useState<Meter | null>(null);
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [groupModalMode, setGroupModalMode] = useState<"add" | "remove">("add");
  const [groupModalGroupId, setGroupModalGroupId] = useState<number | null>(
    null
  );

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

  const handleEdit = (meter: Meter) => {
    if (!canEdit) return;
    setEditingMeter(meter);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingMeter(null);
    setEditModalOpen(false);
  };

  const handleView = (meter: Meter) => {
    setDetailsMeter(meter);
    setDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsMeter(null);
    setDetailsOpen(false);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(0);
  };

  const handleValveFilterChange = (value: "all" | "open" | "closed") => {
    setValveFilter(value);
    setPage(0);
  };

  const handleArchivedChange = (archived: boolean) => {
    setIsArchived(archived);
    setPage(0);
  };

  const handleGroupChange = (id: number | null) => {
    setGroupId(id);
    setPage(0);
  };

  const openAddToGroupModal = () => {
    if (
      !canManageMetersToGroups ||
      selectedIds.length === 0 ||
      groups.length === 0
    ) {
      return;
    }

    setGroupModalMode("add");
    setGroupModalGroupId(groupId ?? null);
    setGroupModalOpen(true);
  };

  const openRemoveFromGroupModal = () => {
    if (
      !canManageMetersToGroups ||
      selectedIds.length === 0 ||
      groups.length === 0
    ) {
      return;
    }

    setGroupModalMode("remove");
    setGroupModalGroupId(groupId ?? null);
    setGroupModalOpen(true);
  };

  const closeGroupModal = () => {
    setGroupModalOpen(false);
    setGroupModalGroupId(null);
  };

  const handleConfirmGroupModal = () => {
    if (!groupModalGroupId || selectedIds.length === 0) return;

    if (groupModalMode === "add") {
      handleAddMetersToGroup(groupModalGroupId, selectedIds);
    } else {
      handleRemoveMetersFromGroup(groupModalGroupId, selectedIds);
    }

    clearSelection();
    closeGroupModal();
  };

  const columns = createMeterColumns({
    isAdmin,
    canEdit,
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

  const isEmptyState = !isLoading && !isError && !hasMeters;

  return (
    <>
      <Box>
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Ошибка при загрузке счётчиков
          </Alert>
        )}

        <MetersActions
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

        {isLoading && (
          <Box mt={2}>
            <Loader />
          </Box>
        )}

        {isEmptyState && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {emptyText}
          </Alert>
        )}

        {!isLoading && hasMeters && (
          <>
            <DataTable
              rows={meters}
              columns={columns}
              getRowId={(m: Meter) => m.id}
            />

            <Pagination
              page={page}
              limit={limit}
              total={total}
              onPageChange={setPage}
              rowsPerPageOptions={[5, 10, 20]}
              labelRowsPerPage="Счётчиков на странице:"
              onRowsPerPageChange={(newLimit) => {
                setLimit(newLimit);
                setPage(0);
              }}
            />
          </>
        )}
      </Box>

      <Modal
        open={isEditModalOpen}
        onClose={closeEditModal}
        title="Редактировать счётчик"
      >
        <MeterForm
          meterToEdit={editingMeter}
          onClose={closeEditModal}
          canArchive={isAdmin}
        />
      </Modal>

      <Modal
        open={isDetailsOpen}
        onClose={closeDetailsModal}
        title="Детальная информация по счётчику"
      >
        {detailsMeter && <MeterDetails meter={detailsMeter} />}
      </Modal>

      <MeterGroupModal
        open={groupModalOpen}
        mode={groupModalMode}
        groups={groups}
        selectedCount={selectedIds.length}
        selectedGroupId={groupModalGroupId}
        onChangeGroup={setGroupModalGroupId}
        onClose={closeGroupModal}
        onConfirm={handleConfirmGroupModal}
      />

      <MetersFiltersModal
        open={isFiltersOpen}
        onClose={() => setFiltersOpen(false)}
        status={status}
        onStatusChange={handleStatusChange}
        valveFilter={valveFilter}
        onValveFilterChange={handleValveFilterChange}
        isArchived={isArchived}
        onArchivedChange={handleArchivedChange}
        groupId={groupId}
        onGroupChange={handleGroupChange}
        groups={groups}
      />
    </>
  );
};

export default Meters;
