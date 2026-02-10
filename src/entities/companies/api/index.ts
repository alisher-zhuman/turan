import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";
import type { CompanyPayload } from "../model/types";
import { CompaniesResponseSchema } from "../model/schemas";

export const getCompanies = async (isArchived: boolean) => {
  const { data } = await api.get(API_ROUTES.COMPANIES, {
    params: { isArchived },
  });

  return CompaniesResponseSchema.parse(data.data);
};

export const createCompany = async (newCompany: CompanyPayload) => {
  await api.post(API_ROUTES.COMPANIES, newCompany);
};

export const editCompany = async (
  companyId: number,
  payload: CompanyPayload,
) => {
  await api.patch(
    `${API_ROUTES.COMPANIES}/${companyId}`,
    payload,
  );
};

export const archiveCompany = async (id: number) => {
  await api.post(`${API_ROUTES.COMPANIES_ARCHIVE}/${id}`);
};

export const unarchiveCompany = async (id: number) => {
  await api.post(`${API_ROUTES.COMPANIES_UNARCHIVE}/${id}`);
};

export const refreshCompanyToken = async (companyId: number) => {
  await api.post(API_ROUTES.COMPANIES_TOKEN_REFRESH, {
    companyId,
  });
};
