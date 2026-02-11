import { useMemo } from "react";
import {
  createCompanyColumns,
  useCompaniesQuery,
  useCompanyActions,
  useCompanyFilters,
} from "@/features/companies";
import { TableSection } from "@/shared/ui/table-section";
import { ERROR_TEXTS } from "@/shared/constants";
import { CompaniesHeader } from "./ui/companies-header";
import { CompaniesModals } from "./ui/companies-modals";
import { useCompaniesUiState } from "./hooks/useCompaniesUiState";

export const CompaniesWidget = () => {
  const { isArchived, setIsArchived } = useCompanyFilters();

  const { companies, hasCompanies, emptyText, isLoading, isError } =
    useCompaniesQuery({ isArchived });

  const { handleRefreshToken, handleToggleArchive } = useCompanyActions();

  const {
    isModalOpen,
    editingCompany,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useCompaniesUiState();

  const columns = useMemo(
    () =>
      createCompanyColumns(
        handleRefreshToken,
        handleToggleArchive,
        openEditModal,
      ),
    [handleRefreshToken, handleToggleArchive, openEditModal],
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
      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText={ERROR_TEXTS.companies}
        errorVariant="filled"
        hasItems={hasCompanies}
        emptyText={emptyText}
        toolbar={toolbar}
        rows={companies}
        columns={columns}
        getRowId={(c) => c.id}
      />

      <CompaniesModals
        isOpen={isModalOpen}
        editingCompany={editingCompany}
        onClose={closeModal}
      />
    </>
  );
};
