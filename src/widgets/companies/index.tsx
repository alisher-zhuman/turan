import { createCompanyColumns, useCompanies } from "@/features/companies";
import { CompaniesHeader } from "./ui/companies-header";
import { CompaniesModals } from "./ui/companies-modals";
import { CompaniesTableSection } from "./ui/companies-table-section";
import { useCompaniesUiState } from "./hooks/useCompaniesUiState";

export const CompaniesWidget = () => {
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

  const {
    isModalOpen,
    editingCompany,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useCompaniesUiState();

  const columns = createCompanyColumns(
    handleRefreshToken,
    handleToggleArchive,
    openEditModal,
  );

  const toolbar = (
    <CompaniesHeader
      isArchived={isArchived}
      onChangeArchived={setIsArchived}
      onCreate={openCreateModal}
    />
  );

  return (
    <>
      <CompaniesTableSection
        isLoading={isLoading}
        isError={isError}
        hasCompanies={hasCompanies}
        emptyText={emptyText}
        companies={companies}
        columns={columns}
        toolbar={toolbar}
      />

      <CompaniesModals
        isOpen={isModalOpen}
        editingCompany={editingCompany}
        onClose={closeModal}
      />
    </>
  );
};
