import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";
import type { CompanyPayload } from "../model/types";
import { CompaniesResponseSchema } from "./schema";

export const getCompanies = async (isArchived: boolean) => {
  const { data } = await api.get(API_ROUTES.COMPANIES, {
    params: { isArchived },
  });

  return CompaniesResponseSchema.parse(data.data);
};

export const createCompany = async (newCompany: CompanyPayload) => {
  const { data } = await api.post(API_ROUTES.COMPANIES, newCompany);
  return data;
};

export const editCompany = async (
  companyId: number,
  payload: CompanyPayload,
) => {
  const { data } = await api.patch(
    `${API_ROUTES.COMPANIES}/${companyId}`,
    payload,
  );
  return data;
};

export const archiveCompany = async (id: number) => {
  const { data } = await api.post(`${API_ROUTES.COMPANIES_ARCHIVE}/${id}`);
  return data;
};

export const unarchiveCompany = async (id: number) => {
  const { data } = await api.post(`${API_ROUTES.COMPANIES_UNARCHIVE}/${id}`);
  return data;
};

export const refreshCompanyToken = async (companyId: number) => {
  const { data } = await api.post(API_ROUTES.COMPANIES_TOKEN_REFRESH, {
    companyId,
  });
  return data;
};
