import { api } from "@/shared/api";
import type { CompanyPayload } from "@/features/companies/interfaces/companies";

export const getCompanies = async (isArchived: boolean) => {
  const { data } = await api.get(`/companies`, {
    params: { isArchived },
  });

  return data.data;
};

export const createCompany = async (newCompany: CompanyPayload) => {
  const { data } = await api.post("/companies", newCompany);
  return data;
};

export const editCompany = async (
  companyId: number,
  payload: CompanyPayload
) => {
  const { data } = await api.patch(`/companies/${companyId}`, payload);
  return data;
};

export const refreshCompanyToken = async (companyId: number) => {
  const { data } = await api.post("/companies/token/refresh", { companyId });
  return data;
};

export const archiveCompany = async (id: number) => {
  const { data } = await api.post(`/companies/archive/${id}`);
  return data;
};

export const unarchiveCompany = async (id: number) => {
  const { data } = await api.post(`/companies/unarchive/${id}`);
  return data;
};
