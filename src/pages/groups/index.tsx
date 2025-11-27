import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { useAuthStore } from "@/features/authentication/store/auth";
import { GroupForm } from "@/features/groups/ui/group-form";
import { createGroupColumns } from "@/features/groups/columns";
import { deleteGroup, getGroups } from "@/features/groups/api";
import type { Group } from "@/features/groups/interface";
import { Loader } from "@/shared/ui/loader";
import { Pagination } from "@/shared/ui/pagination";
import { Modal } from "@/shared/ui/modal";
import { DataTable } from "@/shared/ui/data-table";

const Groups = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["groups", page, limit],
    queryFn: () => getGroups(page + 1, limit),
    staleTime: 5000,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Alert severity="error">Ошибка при загрузке групп</Alert>;
  }

  const hasGroups = data?.data?.length > 0;

  const isAdmin = user?.role === "admin";

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

  const handleDelete = async (groupId: number) => {
    if (!isAdmin) return;

    try {
      await deleteGroup(groupId);
      toast.success("Группа удалена");
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении группы"
      );
    }
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
            Группы не найдены
          </Alert>
        )}

        {hasGroups && (
          <>
            <DataTable
              rows={data.data ?? []}
              columns={columns}
              getRowId={(g) => g.id}
            />

            <Pagination
              page={page}
              limit={limit}
              total={data.total ?? 0}
              onPageChange={setPage}
              rowsPerPageOptions={[5, 10, 20]}
              labelRowsPerPage="Групп на странице:"
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
        title={editingGroup ? "Редактировать группу" : "Создать группу"}
      >
        <GroupForm groupToEdit={editingGroup} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Groups;
