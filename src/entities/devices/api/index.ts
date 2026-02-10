import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";
import { DevicesResponseSchema } from "../model/schemas";

export const getDevices = async (page = 1, limit = 10, verified = false) => {
  const { data } = await api.get(API_ROUTES.DEVICES, {
    params: { page, limit, verified, isArchived: false },
  });
  return DevicesResponseSchema.parse(data);
};

export const verifyDevice = async (deviceId: number) => {
  await api.patch(API_ROUTES.DEVICES_VERIFY, null, {
    params: { deviceId },
  });
};

export const deleteDevice = async (deviceIds: number[]) => {
  await api.delete(API_ROUTES.DEVICES_REMOVE, {
    data: { deviceIds },
  });
};
