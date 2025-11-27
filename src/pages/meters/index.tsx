import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useMeters } from "@/features/meters/hooks/useMeters";
import { createMeterColumns } from "@/features/meters/columns";
import { MeterForm } from "@/features/meters/ui/meter-form";
import type { Meter } from "@/features/meters/interfaces";
import { DataTable } from "@/shared/ui/data-table";
import { Loader } from "@/shared/ui/loader";
import { Pagination } from "@/shared/ui/pagination";
import { Modal } from "@/shared/ui/modal";

const Meters = () => {
  const [editingMeter, setEditingMeter] = useState<Meter | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

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

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Alert severity="error">Ошибка при загрузке счётчиков</Alert>;
  }

  const handleEdit = (meter: Meter) => {
    if (!canEdit) return;
    setEditingMeter(meter);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingMeter(null);
    setModalOpen(false);
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
  });

  return (
    <>
      <Box>
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Box display="flex" gap={2}>
            <Select
              sx={{ maxHeight: 38, minWidth: 160 }}
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(0);
              }}
            >
              <MenuItem value="normal">Нормальные</MenuItem>
              <MenuItem value="warning">Предупреждения</MenuItem>
              <MenuItem value="error">С ошибками</MenuItem>
              <MenuItem value="all">Все статусы</MenuItem>
            </Select>

            <Select
              sx={{ maxHeight: 38, minWidth: 160 }}
              value={isArchived ? "archived" : "active"}
              onChange={(e) => {
                setIsArchived(e.target.value === "archived");
                setPage(0);
              }}
            >
              <MenuItem value="active">Активные</MenuItem>
              <MenuItem value="archived">Архивные</MenuItem>
            </Select>
          </Box>

          {isAdmin && (
            <Button
              variant="outlined"
              color="error"
              disabled={selectedIds.length === 0}
              onClick={handleDeleteSelected}
            >
              Удалить выбранные
            </Button>
          )}
        </Box>

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
        open={isModalOpen}
        onClose={closeModal}
        title="Редактировать счётчик"
      >
        <MeterForm
          meterToEdit={editingMeter}
          onClose={closeModal}
          canArchive={isAdmin}
        />
      </Modal>
    </>
  );
};

export default Meters;
