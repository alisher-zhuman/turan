import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  CompanyForm,
  createCompanyColumns,
  useCompanies,
} from "@/features/companies";
import type { Company } from "@/entities/companies";
import { Modal } from "@/shared/ui/modal";
import { DataTable } from "@/shared/ui/data-table";
import { ListSection } from "@/shared/ui/list-section";

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

  const toolbar = (
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
  );

  return (
    <>
      <ListSection
        isLoading={isLoading}
        isError={isError}
        errorText="Ошибка при загрузке компаний"
        errorVariant="filled"
        hasItems={hasCompanies}
        emptyText={emptyText}
        toolbar={toolbar}
      >
        <DataTable
          rows={companies}
          columns={columns}
          getRowId={(c: Company) => c.id}
        />
      </ListSection>

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
