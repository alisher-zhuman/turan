import { useMemo } from "react";

import {
  createCompanyColumns,
  useCompaniesQuery,
  useCompanyActions,
  useCompanyFilters,
} from "@/features/companies";

import type { Company } from "@/entities/companies";

import { ERROR_TEXTS } from "@/shared/constants";
import { useEntityModal } from "@/shared/hooks";
import { TableSection } from "@/shared/ui/table-section";

import { CompaniesHeader } from "./ui/companies-header";
import { CompaniesModals } from "./ui/companies-modals";

export const CompaniesWidget = () => {
  const { isArchived, setIsArchived } = useCompanyFilters();

  const { companies, hasCompanies, emptyText, isLoading, isError } =
    useCompaniesQuery({ isArchived });

  const { handleRefreshToken, handleToggleArchive } = useCompanyActions();

  const {
    isOpen: isModalOpen,
    editingItem: editingCompany,
    openCreate: openCreateModal,
    openEdit: openEditModal,
    close: closeModal,
  } = useEntityModal<Company>();

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
