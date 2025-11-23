import { api } from "@/shared/api";
import type { CreateUserPayload } from "../interfaces";

export const getUsers = async (page = 1, limit = 10, isArchived = false) => {
  const { data } = await api.get("/users", {
    params: { page, limit, isArchived },
  });
  return data;
};

export const createUser = async (payload: CreateUserPayload) => {
  const { data } = await api.post("/users", payload);
  return data;
};
