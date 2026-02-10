import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { createGroupColumns, GroupForm, useGroups } from "@/features/groups";
import type { Group } from "@/entities/groups";
import { Loader } from "@/shared/ui/loader";
import { Pagination } from "@/shared/ui/pagination";
import { Modal } from "@/shared/ui/modal";
import { DataTable } from "@/shared/ui/data-table";

export const GroupsWidget = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const {
    groups,
    total,
    hasGroups,
    emptyText,
    isLoading,
    isError,
    page,
    limit,
    setPage,
    setLimit,
    isAdmin,
    handleDelete,
  } = useGroups({});

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Alert severity="error">Ошибка при загрузке групп</Alert>;
  }

  const openCreateModal = () => {
    if (!isAdmin) return;
    setEditingGroup(null);
    setModalOpen(true);
  };

  const openEditModal = (group: Group) => {
    if (!isAdmin) return;
    setEditingGroup(group);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingGroup(null);
    setModalOpen(false);
  };

  const columns = createGroupColumns(openEditModal, handleDelete, isAdmin);

  return (
    <>
      <Box>
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          {isAdmin && (
            <Button
              onClick={openCreateModal}
              variant="contained"
              color="primary"
            >
              Создать
            </Button>
          )}
        </Box>

        {!hasGroups && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {emptyText}
          </Alert>
        )}

        {hasGroups && (
          <>
            <DataTable
              rows={groups}
              columns={columns}
              getRowId={(g: Group) => g.id}
            />

            <Pagination
              page={page}
              limit={limit}
              total={total}
              onPageChange={setPage}
              rowsPerPageOptions={[5, 10, 20]}
              labelRowsPerPage="Групп на странице:"
              onLimitChange={setLimit}
            />
          </>
        )}
      </Box>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={editingGroup ? "Редактировать группу" : "Создать группу"}
      >
        <GroupForm groupToEdit={editingGroup} onClose={closeModal} />
      </Modal>
    </>
  );
};
