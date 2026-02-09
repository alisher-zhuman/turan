import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { CompanyForm } from "@/features/companies/ui/company-form";
import { createCompanyColumns } from "@/features/companies/columns";
import { Modal } from "@/shared/ui/modal";
import { DataTable } from "@/shared/ui/data-table";
import { Loader } from "@/shared/ui/loader";
import type { Company } from "@/shared/types";

export const CompaniesWidget = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const {
    companies,
    hasCompanies,
    emptyText,
    isArchived,
    setIsArchived,
    isLoading,
    isError,
    handleRefreshToken,
    handleToggleArchive,
  } = useCompanies();

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

  const openEditModal = (company: Company) => {
    setEditingCompany(company);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingCompany(null);
    setModalOpen(false);
  };

  const columns = createCompanyColumns(
    handleRefreshToken,
    handleToggleArchive,
    openEditModal,
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
          <DataTable
            rows={companies}
            columns={columns}
            getRowId={(c: Company) => c.id}
          />
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
