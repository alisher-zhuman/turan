import { useQuery } from "@tanstack/react-query";

import { companiesKeys, type Company, getCompanies } from "@/entities/companies";

const COMPANIES_QUERY_OPTIONS = {
  staleTime: 60_000,
  retry: 1,
} as const;

interface Params {
  isArchived: boolean;
}

export const useCompaniesQuery = ({ isArchived }: Params) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: companiesKeys.list(isArchived),
    queryFn: () => getCompanies(isArchived),
    staleTime: COMPANIES_QUERY_OPTIONS.staleTime,
    retry: COMPANIES_QUERY_OPTIONS.retry,
  });

  const companies: Company[] = data ?? [];
  const hasCompanies = companies.length > 0;

  const emptyText = isArchived
    ? "Нет архивных компаний"
    : "Нет активных компаний";

  return {
    companies,
    hasCompanies,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
