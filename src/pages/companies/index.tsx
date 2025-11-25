import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import type { Company } from "@/features/companies/interfaces/companies";
import { CompanyForm } from "@/features/companies/ui/company-form";
import { createCompanyColumns } from "@/features/companies/columns";
import {
  archiveCompany,
  getCompanies,
  refreshCompanyToken,
  unarchiveCompany,
} from "@/features/companies/api/companies";
import { Loader } from "@/shared/ui/loader";
import { Modal } from "@/shared/ui/modal";
import { DataTable } from "@/shared/ui/data-table";

const Companies = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isArchived, setIsArchived] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["companies", isArchived],
    queryFn: () => getCompanies(isArchived),
  });

  const refreshTokenMutation = useMutation({
    mutationFn: (id: number) => refreshCompanyToken(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("API ключ обновлён");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(
        error.response?.data?.message || "Ошибка при обновлении API ключа"
      );
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError)
    return (
      <Alert severity="error" variant="filled">
        Ошибка при загрузке компаний
      </Alert>
    );

  const toggleModal = () => setModalOpen((prev) => !prev);

  const handleToggleArchive = async (companyId: number, archived: boolean) => {
    try {
      if (archived) {
        await unarchiveCompany(companyId);
        toast.success("Компания разархивирована");
      } else {
        await archiveCompany(companyId);
        toast.success("Компания архивирована");
      }

      queryClient.invalidateQueries({ queryKey: ["companies"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при изменении статуса компании"
      );
    }
  };

  const openEditModal = (company: Company) => {
    setEditingCompany(company);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingCompany(null);
    setModalOpen(false);
  };

  const hasCompanies = data && data.length > 0;

  const emptyText = isArchived
    ? "Нет архивных компаний"
    : "Нет активных компаний";

  const columns = createCompanyColumns(
    (id) => refreshTokenMutation.mutate(id),
    handleToggleArchive,
    openEditModal
  );

  return (
    <>
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
            onChange={(e) => setIsArchived(e.target.value === "archived")}
          >
            <MenuItem value="active">Активные</MenuItem>
            <MenuItem value="archived">Архивные</MenuItem>
          </Select>

          <Button onClick={toggleModal} variant="contained" color="primary">
            Создать
          </Button>
        </Box>

        {!hasCompanies && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {emptyText}
          </Alert>
        )}

        {hasCompanies && (
          <DataTable rows={data} columns={columns} getRowId={(c) => c.id} />
        )}
      </Box>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={editingCompany ? "Редактировать компанию" : "Создать компанию"}
      >
        <CompanyForm company={editingCompany} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Companies;
