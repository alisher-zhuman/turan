import { api } from "@/shared/api";

export const getMeters = async (
  page = 1,
  limit = 10,
  isArchived = false,
  status?: string
) => {
  const params: Record<string, unknown> = {
    page,
    limit,
    isArchived,
  };

  if (status && status !== "all") {
    params.status = status;
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
  customerID?: number | null;
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
