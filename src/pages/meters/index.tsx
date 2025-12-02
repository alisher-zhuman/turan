import { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useMeters } from "@/features/meters/hooks/useMeters";
import { useGroups } from "@/features/groups/hooks/useGroups";
import { createMeterColumns } from "@/features/meters/columns";
import { MeterForm } from "@/features/meters/ui/meter-form";
import { MeterDetails } from "@/features/meters/ui/meter-details";
import { MetersFilters } from "@/features/meters/ui/meters-filters";
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
    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,
    handleDeleteOne,
    handleDeleteSelected,
    handleCommand,
  } = useMeters();

  const { groups } = useGroups({ forFilter: true });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Alert severity="error">Ошибка при загрузке счётчиков</Alert>;
  }

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

  return (
    <>
      <Box>
        <MetersFilters
          status={status}
          onStatusChange={handleStatusChange}
          valveFilter={valveFilter}
          onValveFilterChange={handleValveFilterChange}
          isArchived={isArchived}
          onArchivedChange={handleArchivedChange}
          groupId={groupId}
          onGroupChange={handleGroupChange}
          groups={groups}
          isAdmin={isAdmin}
          selectedCount={selectedIds.length}
          onDeleteSelected={handleDeleteSelected}
        />

        {!hasMeters && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {emptyText}
          </Alert>
        )}

        {hasMeters && (
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
    </>
  );
};

export default Meters;
