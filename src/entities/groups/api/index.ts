import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";
import { GroupActionResponseSchema, GroupsResponseSchema } from "../model/schemas";

export const getGroups = async (page = 1, limit = 10) => {
  const { data } = await api.get(API_ROUTES.GROUPS, {
    params: { page, limit },
  });

  return GroupsResponseSchema.parse(data);
};

export const createGroup = async (groupName: string) => {
  await api.post(API_ROUTES.GROUPS_CREATE, null, {
    params: { groupName },
  });
};

export const updateGroup = async (groupId: number, newName: string) => {
  await api.patch(API_ROUTES.GROUPS, null, {
    params: { groupId, newName },
  });
};

export const deleteGroup = async (groupId: number) => {
  await api.delete(`${API_ROUTES.GROUPS}/${groupId}`);
};

export const addMetersToGroup = async (groupId: number, meterIds: number[]) => {
  const { data } = await api.post(API_ROUTES.GROUPS_ADD, {
    groupId,
    meterIds,
  });

  return GroupActionResponseSchema.parse(data) as typeof data;
};

export const removeMetersFromGroup = async (
  groupId: number,
  meterIds: number[],
) => {
  const { data } = await api.post(API_ROUTES.GROUPS_REMOVE, {
    groupId,
    meterIds,
  });

  return GroupActionResponseSchema.parse(data) as typeof data;
};
