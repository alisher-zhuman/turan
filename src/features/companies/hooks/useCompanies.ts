import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import {
  archiveCompany,
  getCompanies,
  refreshCompanyToken,
  unarchiveCompany,
  type Company,
} from "@/entities/companies";

export const useCompanies = () => {
  const [isArchived, setIsArchived] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, isFetching } = useQuery({
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
        error.response?.data?.message || "Ошибка при обновлении API ключа",
      );
    },
  });

  const toggleArchiveMutation = useMutation({
    mutationFn: ({
      companyId,
      archived,
    }: {
      companyId: number;
      archived: boolean;
    }) =>
      archived ? unarchiveCompany(companyId) : archiveCompany(companyId),
    onSuccess: (_, { archived }) => {
      toast.success(
        archived ? "Компания разархивирована" : "Компания архивирована",
      );
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(
        error.response?.data?.message ||
          "Ошибка при изменении статуса компании",
      );
    },
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
