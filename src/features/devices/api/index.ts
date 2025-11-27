import { api } from "@/shared/api";

export const getDevices = async (page = 1, limit = 10, verified = false) => {
  const { data } = await api.get("/devices", {
    params: { page, limit, verified, isArchived: false },
  });
  return data;
};

export const verifyDevice = async (deviceId: number) => {
  const { data } = await api.patch(`/devices/verify`, null, {
    params: { deviceId },
  });
  return data;
};

export const deleteDevice = async (deviceIds: number[]) => {
  const { data } = await api.delete(`/devices/remove`, {
    data: { deviceIds },
  });
  return data;
};
