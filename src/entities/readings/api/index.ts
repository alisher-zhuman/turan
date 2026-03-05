import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";

import { ReadingsResponseSchema } from "../model/schemas";

interface GetReadingsParams {
  page?: number;
  limit?: number;
  meterId?: number | null;
  dateFrom?: string;
  dateTo?: string;
  customerID?: string;
  client?: string;
  address?: string;
}

export const getReadings = async ({
  page = 1,
  limit = 10,
  meterId,
  dateFrom,
  dateTo,
  customerID,
  client,
  address,
}: GetReadingsParams = {}) => {
  const params: Record<string, unknown> = { page, limit };

  if (
    meterId !== null &&
    meterId !== undefined &&
    Number.isInteger(meterId) &&
    meterId > 0
  ) {
    params.meterId = meterId;
  }

  if (dateFrom?.trim()) {
    params.dateFrom = dateFrom.trim();
  }

  if (dateTo?.trim()) {
    params.dateTo = dateTo.trim();
  }

  if (customerID?.trim()) {
    params.customerID = customerID.trim();
  }

  if (client?.trim()) {
    params.client = client.trim();
  }

  if (address?.trim()) {
    params.address = address.trim();
  }

  const { data } = await api.get(API_ROUTES.READINGS, {
    params,
  });

  return ReadingsResponseSchema.parse(data);
};

export const deleteReadings = async (readingIds: string[]) => {
  await api.post(API_ROUTES.READINGS_DELETE, { readingIds });
};
