import type { ReactNode } from "react";
import type { Column } from "@/shared/types";
import type { Company } from "@/entities/companies";
import { DataTable } from "@/shared/ui/data-table";
import { ListSection } from "@/shared/ui/list-section";

interface Props {
  isLoading: boolean;
  isError: boolean;
  hasCompanies: boolean;
  emptyText: string;
  companies: Company[];
  columns: Column<Company>[];
  toolbar?: ReactNode;
}

export const CompaniesTableSection = ({
  isLoading,
  isError,
  hasCompanies,
  emptyText,
  companies,
  columns,
  toolbar,
}: Props) => (
  <ListSection
    isLoading={isLoading}
    isError={isError}
    errorText="Ошибка при загрузке компаний"
    errorVariant="filled"
    hasItems={hasCompanies}
    emptyText={emptyText}
    toolbar={toolbar}
  >
    <DataTable rows={companies} columns={columns} getRowId={(c) => c.id} />
  </ListSection>
);
