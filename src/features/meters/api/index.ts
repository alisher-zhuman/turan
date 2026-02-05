import { api } from "@/shared/api";

export const getMeters = async (
  page = 1,
  limit = 10,
  isArchived = false,
  status?: string,
  groupId?: number | null,
  customerId?: string,
  meterName?: string
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

  const { data } = await api.get("/meters", { params });

  return data;
};

export const deleteMeters = async (meterIds: number[]) => {
  const { data } = await api.delete("/meters", {
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

  const { data } = await api.patch(`/meters/${meterId}`, null, {
    params: {
      meterId,
      ...rest,
    },
  });

  return data;
};

export const sendMeterCommand = async (
  meterId: number,
  command: "open" | "close"
) => {
  const { data } = await api.patch(`/meters/command/${meterId}`, null, {
    params: {
      meterId,
      command,
    },
  });

  return data;
};
