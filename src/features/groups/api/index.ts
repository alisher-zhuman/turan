import { api } from "@/shared/api";

export const getGroups = async (page = 1, limit = 10) => {
  const { data } = await api.get("/group", {
    params: { page, limit },
  });

  return data;
};

export const createGroup = async (groupName: string) => {
  const { data } = await api.post("/group/create", null, {
    params: { groupName },
  });
  return data;
};

export const updateGroup = async (groupId: number, newName: string) => {
  const { data } = await api.patch(`/group`, null, {
    params: { groupId, newName },
  });
  return data;
};

export const deleteGroup = async (groupId: number) => {
  const { data } = await api.delete(`/group/${groupId}`);
  return data;
};
