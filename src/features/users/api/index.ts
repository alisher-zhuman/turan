import { api } from "@/shared/api";

export const getUsers = async (page = 1, limit = 10, isArchived = false) => {
  const { data } = await api.get("/users", {
    params: { page, limit, isArchived },
  });
  return data;
};
