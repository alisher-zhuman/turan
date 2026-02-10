import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";
import type { CreateUserPayload } from "../model/types";
import { UsersResponseSchema } from "../model/schemas";

export const getUsers = async (page = 1, limit = 10, isArchived = false) => {
  const { data } = await api.get(API_ROUTES.USERS, {
    params: { page, limit, isArchived },
  });
  return UsersResponseSchema.parse(data);
};

export const createUser = async (payload: CreateUserPayload) => {
  await api.post(API_ROUTES.USERS, payload);
};

export const editUser = async (id: number, payload: CreateUserPayload) => {
  await api.patch(`${API_ROUTES.USERS}/${id}`, payload);
};

export const deleteUser = async (id: number) => {
  await api.delete(`${API_ROUTES.USERS_DELETE}/${id}`);
};

export const archiveUser = async (id: number) => {
  await api.post(`${API_ROUTES.USERS_ARCHIVE}/${id}`);
};

export const unarchiveUser = async (id: number) => {
  await api.post(`${API_ROUTES.USERS_UNARCHIVE}/${id}`);
};
