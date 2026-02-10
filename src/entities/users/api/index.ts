import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";
import type { CreateUserPayload } from "../model/types";
import { UsersResponseSchema } from "./schema";

export const getUsers = async (page = 1, limit = 10, isArchived = false) => {
  const { data } = await api.get(API_ROUTES.USERS, {
    params: { page, limit, isArchived },
  });
  return UsersResponseSchema.parse(data);
};

export const createUser = async (payload: CreateUserPayload) => {
  const { data } = await api.post(API_ROUTES.USERS, payload);
  return data;
};

export const editUser = async (id: number, payload: CreateUserPayload) => {
  const { data } = await api.patch(`${API_ROUTES.USERS}/${id}`, payload);
  return data;
};

export const deleteUser = async (id: number) => {
  const { data } = await api.delete(`${API_ROUTES.USERS_DELETE}/${id}`);
  return data;
};

export const archiveUser = async (id: number) => {
  const { data } = await api.post(`${API_ROUTES.USERS_ARCHIVE}/${id}`);
  return data;
};

export const unarchiveUser = async (id: number) => {
  const { data } = await api.post(`${API_ROUTES.USERS_UNARCHIVE}/${id}`);
  return data;
};
