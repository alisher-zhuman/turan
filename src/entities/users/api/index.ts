import { api } from "@/shared/api";
import type { CreateUserPayload } from "../model/types";

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

export const editUser = async (id: number, payload: CreateUserPayload) => {
  const { data } = await api.patch(`/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id: number) => {
  const { data } = await api.delete(`/users/delete/${id}`);
  return data;
};

export const archiveUser = async (id: number) => {
  const { data } = await api.post(`/users/archive/${id}`);
  return data;
};

export const unarchiveUser = async (id: number) => {
  const { data } = await api.post(`/users/unarchive/${id}`);
  return data;
};
