import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { getReadings, deleteReadings } from "@/features/readings/api";
import type { Reading } from "@/features/readings/interfaces";
import { createReadingColumns } from "@/features/readings/columns";
import { useAuthStore } from "@/features/authentication/store/auth";
import { DataTable } from "@/shared/ui/data-table";
import { Loader } from "@/shared/ui/loader";
import { Pagination } from "@/shared/ui/pagination";

const Readings = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  const isAdmin = user?.role === "admin";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["readings", page, limit],
    queryFn: () => getReadings(page + 1, limit),
    staleTime: 5000,
  });

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <Alert severity="error">Ошибка при загрузке показаний водомеров</Alert>
    );

  const readings: Reading[] = data?.data;
  const hasReadings = readings.length > 0;
  const total = data?.total;

  const emptyText = "Показания не найдены";

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ["readings"] });
  };

  const handleDeleteOne = async (id: string) => {
    if (!isAdmin) return;

    try {
      await deleteReadings([id]);
      toast.success("Показание удалено");
      setSelectedIds((prev) => prev.filter((x) => x !== id));
      await invalidate();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении показания"
      );
    }
  };

  const handleDeleteSelected = async () => {
    if (!isAdmin || selectedIds.length === 0) return;

    try {
      await deleteReadings(selectedIds);
      toast.success("Выбранные показания удалены");
      setSelectedIds([]);
      await invalidate();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при удалении выбранных показаний"
      );
    }
  };

  const allSelected =
    isAdmin && hasReadings && selectedIds.length === readings.length;
  const isIndeterminate = isAdmin && selectedIds.length > 0 && !allSelected;

  const handleToggleAll = (checked: boolean) => {
    if (!isAdmin) return;
    if (checked) {
      setSelectedIds(readings.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleOne = (id: string) => {
    if (!isAdmin) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const columns = createReadingColumns({
    isAdmin,
    selectedIds,
    allSelected,
    isIndeterminate,
    onToggleAll: handleToggleAll,
    onToggleOne: handleToggleOne,
    onDeleteOne: handleDeleteOne,
  });

  return (
    <Box>
      <Box mb={2} display="flex" alignItems="center" justifyContent="flex-end">
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

      {!hasReadings && (
        <Alert severity="info" sx={{ mt: 2 }}>
          {emptyText}
        </Alert>
      )}

      {hasReadings && (
        <>
          <DataTable
            rows={readings}
            columns={columns}
            getRowId={(r: Reading) => r.id}
          />

          <Pagination
            page={page}
            limit={limit}
            total={total}
            onPageChange={setPage}
            rowsPerPageOptions={[5, 10, 20]}
            labelRowsPerPage="Показаний на странице:"
            onRowsPerPageChange={(newLimit) => {
              setLimit(newLimit);
              setPage(0);
            }}
          />
        </>
      )}
    </Box>
  );
};

export default Readings;
