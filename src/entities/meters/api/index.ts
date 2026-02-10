import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";
import { MetersResponseSchema } from "./schema";

export const getMeters = async (
  page = 1,
  limit = 10,
  isArchived = false,
  status?: string,
  groupId?: number | null,
  customerId?: string,
  meterName?: string,
) => {
  const params: Record<string, unknown> = {
    page,
    limit,
    isArchived,
  };

  if (status && status !== "all") {
    params.status = status;
  }

  if (groupId != null) {
    params.groupId = groupId;
  }

  if (customerId && customerId.trim()) {
    params.customerID = customerId.trim();
  }

  if (meterName && meterName.trim()) {
    params.meterName = meterName.trim();
  }

  const { data } = await api.get(API_ROUTES.METERS, { params });

  return MetersResponseSchema.parse(data);
};

export const deleteMeters = async (meterIds: number[]) => {
  const { data } = await api.delete(API_ROUTES.METERS, {
    data: { meterIds },
  });

  return data;
};

export const updateMeter = async (params: {
  meterId: number;
  customerID?: string | null;
  client?: string | null;
  address?: string | null;
  descriptions?: string | null;
  isArchived?: boolean;
}) => {
  const { meterId, ...rest } = params;

  const { data } = await api.patch(`${API_ROUTES.METERS}/${meterId}`, null, {
    params: {
      meterId,
      ...rest,
    },
  });

  return data;
};

export const sendMeterCommand = async (
  meterId: number,
  command: "open" | "close",
) => {
  const { data } = await api.patch(
    `${API_ROUTES.METERS_COMMAND}/${meterId}`,
    null,
    {
      params: {
        meterId,
        command,
      },
    },
  );

  return data;
};
