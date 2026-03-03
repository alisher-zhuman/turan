import type { AxiosError } from "axios";

import {
  archiveCompany,
  companiesKeys,
  refreshCompanyToken,
  unarchiveCompany,
} from "@/entities/companies";

import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

export const useCompanyActions = () => {
  const refreshTokenMutation = useToastMutation({
    mutationFn: (id: number) => refreshCompanyToken(id),
    invalidateKeys: [companiesKeys.all],
    successMessage: "API ключ обновлён",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при обновлении API ключа"),
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
    invalidateKeys: [companiesKeys.all],
    successMessage: (_, { archived }) =>
      archived ? "Компания разархивирована" : "Компания архивирована",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при изменении статуса компании"),
  });

  const handleRefreshToken = (companyId: number) => {
    refreshTokenMutation.mutate(companyId);
  };

  const handleToggleArchive = (companyId: number, archived: boolean) => {
    toggleArchiveMutation.mutate({ companyId, archived });
  };

  return {
    handleRefreshToken,
    handleToggleArchive,
  };
};
