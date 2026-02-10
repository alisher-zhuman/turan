import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  archiveCompany,
  getCompanies,
  refreshCompanyToken,
  unarchiveCompany,
  type Company,
} from "@/entities/companies";
import { useToastMutation } from "@/shared/hooks";

export const useCompanies = () => {
  const [isArchived, setIsArchived] = useState(false);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["companies", isArchived],
    queryFn: () => getCompanies(isArchived),
  });

  const refreshTokenMutation = useToastMutation({
    mutationFn: (id: number) => refreshCompanyToken(id),
    invalidateKeys: [["companies"]],
    successMessage: "API ключ обновлён",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      error.response?.data?.message || "Ошибка при обновлении API ключа",
  });

  const toggleArchiveMutation = useToastMutation({
    mutationFn: ({
      companyId,
      archived,
    }: {
      companyId: number;
      archived: boolean;
    }) =>
      archived ? unarchiveCompany(companyId) : archiveCompany(companyId),
    invalidateKeys: [["companies"]],
    successMessage: (_, { archived }) =>
      archived ? "Компания разархивирована" : "Компания архивирована",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      error.response?.data?.message ||
      "Ошибка при изменении статуса компании",
  });

  const companies: Company[] = data ?? [];
  const hasCompanies = companies.length > 0;

  const emptyText = isArchived
    ? "Нет архивных компаний"
    : "Нет активных компаний";

  const handleRefreshToken = (companyId: number) => {
    refreshTokenMutation.mutate(companyId);
  };

  const handleToggleArchive = (companyId: number, archived: boolean) => {
    toggleArchiveMutation.mutate({ companyId, archived });
  };

  return {
    companies,
    hasCompanies,
    emptyText,
    isArchived,
    setIsArchived,
    isLoading,
    isError,
    isFetching,
    handleRefreshToken,
    handleToggleArchive,
  };
};
