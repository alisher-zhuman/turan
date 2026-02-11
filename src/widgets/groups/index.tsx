import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createGroupColumns, GroupForm, useGroups } from "@/features/groups";
import type { Group } from "@/entities/groups";
import { Pagination } from "@/shared/ui/pagination";
import { Modal } from "@/shared/ui/modal";
import { DataTable } from "@/shared/ui/data-table";
import { ListSection } from "@/shared/ui/list-section";

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

  const toolbar = (
    <Box mb={2} display="flex" alignItems="center" justifyContent="flex-end">
      {isAdmin && (
        <Button onClick={openCreateModal} variant="contained" color="primary">
          Создать
        </Button>
      )}
    </Box>
  );

  const pagination = (
    <Pagination
      page={page}
      limit={limit}
      total={total}
      onPageChange={setPage}
      rowsPerPageOptions={[5, 10, 20]}
      labelRowsPerPage="Групп на странице:"
      onLimitChange={setLimit}
    />
  );

  return (
    <>
      <ListSection
        isLoading={isLoading}
        isError={isError}
        errorText="Ошибка при загрузке групп"
        hasItems={hasGroups}
        emptyText={emptyText}
        toolbar={toolbar}
        pagination={pagination}
      >
        <DataTable
          rows={groups}
          columns={columns}
          getRowId={(g: Group) => g.id}
        />
      </ListSection>

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
