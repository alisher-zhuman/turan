import { api } from "@/shared/api";

export const getDevices = async (
  page = 1,
  limit = 10,
  verified = false,
  isArchived = false
) => {
  const { data } = await api.get("/devices", {
    params: { page, limit, verified, isArchived },
  });
  return data;
};

export const verifyDevice = async (deviceId: number) => {
  const { data } = await api.patch(`/devices/verify`, undefined, {
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
