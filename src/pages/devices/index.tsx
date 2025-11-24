import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DevicesTable } from "@/features/devices/ui/devices-table";
import { getDevices, verifyDevice, deleteDevice } from "@/features/devices/api";
import { Loader } from "@/shared/ui/loader";
import { Pagination } from "@/shared/ui/pagination";

const Devices = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [verified, setVerified] = useState(false);
  const [isArchived, setIsArchived] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["devices", page, limit, verified, isArchived],
    queryFn: () => getDevices(page + 1, limit, verified, isArchived),
    staleTime: 5000,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return <Alert severity="error">Ошибка при загрузке устройств</Alert>;

  const hasDevices = data?.data?.length > 0;

  let emptyText = "Устройства не найдены";

  if (!isArchived && !verified) {
    emptyText = "Нет неподтверждённых устройств";
  } else if (!isArchived && verified) {
    emptyText = "Нет подтверждённых устройств";
  } else if (isArchived && !verified) {
    emptyText = "Нет архивных неподтверждённых устройств";
  } else if (isArchived && verified) {
    emptyText = "Нет архивных подтверждённых устройств";
  }

  const handleVerify = async (deviceId: number) => {
    console.log(deviceId);

    try {
      await verifyDevice(deviceId);
      toast.success("Устройство подтверждено");

      queryClient.invalidateQueries({ queryKey: ["devices"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при подтверждении устройства"
      );
    }
  };

  const handleDelete = async (deviceId: number) => {
    try {
      await deleteDevice([+deviceId]);
      toast.success("Устройство удалено");

      queryClient.invalidateQueries({ queryKey: ["devices"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении устройства"
      );
    }
  };

  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        gap={2}
      >
        <Select
          sx={{ maxHeight: 38 }}
          value={isArchived ? "archived" : "active"}
          onChange={(e) => {
            setIsArchived(e.target.value === "archived");
            setPage(0);
          }}
        >
          <MenuItem value="active">Активные</MenuItem>
          <MenuItem value="archived">Архивные</MenuItem>
        </Select>

        <Select
          sx={{ maxHeight: 38 }}
          value={verified ? "verified" : "unverified"}
          onChange={(e) => {
            setVerified(e.target.value === "verified");
            setPage(0);
          }}
        >
          <MenuItem value="unverified">Неподтверждённые</MenuItem>
          <MenuItem value="verified">Подтверждённые</MenuItem>
        </Select>
      </Box>

      {!hasDevices && (
        <Alert severity="info" sx={{ mt: 2 }}>
          {emptyText}
        </Alert>
      )}

      {hasDevices && (
        <>
          <DevicesTable
            devices={data.data}
            onVerify={handleVerify}
            onDelete={handleDelete}
          />

          <Pagination
            page={page}
            limit={limit}
            total={data.total}
            onPageChange={setPage}
            rowsPerPageOptions={[5, 10, 20]}
            labelRowsPerPage="Устройств на странице:"
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

export default Devices;
