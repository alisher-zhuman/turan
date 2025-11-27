import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { Company } from "@/features/companies/interfaces/companies";
import {
  archiveCompany,
  getCompanies,
  refreshCompanyToken,
  unarchiveCompany,
} from "@/features/companies/api/companies";

export const useCompanies = () => {
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

  const companies: Company[] = data;
  const hasCompanies = companies.length > 0;

  const emptyText = isArchived
    ? "Нет архивных компаний"
    : "Нет активных компаний";

  const handleRefreshToken = (companyId: number) => {
    refreshTokenMutation.mutate(companyId);
  };

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

  return {
    companies,
    hasCompanies,
    emptyText,
    isArchived,
    setIsArchived,
    isLoading,
    isError,
    handleRefreshToken,
    handleToggleArchive,
  };
};
