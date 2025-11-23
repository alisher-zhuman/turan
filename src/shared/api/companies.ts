import { api } from ".";

export const getCompanies = async () => {
  const { data } = await api.get("/companies");
  return data.data;
};

export const createCompany = async (newCompany: {
  name: string;
  address: string;
}) => {
  const { data } = await api.post("/companies", newCompany);
  return data;
};

export const refreshCompanyToken = async (companyId: number) => {
  const { data } = await api.post("/companies/token/refresh", { companyId });
  return data;
};
