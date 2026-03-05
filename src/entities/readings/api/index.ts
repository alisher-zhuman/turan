import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";
import { getFilenameFromContentDisposition } from "@/shared/helpers";

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

const trimOrNull = (value?: string) => {
  const normalized = value?.trim();
  return normalized ? normalized : null;
};

const withTrimmedParam = (
  params: Record<string, unknown>,
  key: string,
  value?: string,
) => {
  const normalized = trimOrNull(value);
  if (normalized) {
    params[key] = normalized;
  }
};

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

  if (Number.isInteger(meterId) && (meterId ?? 0) > 0) {
    params.meterId = meterId;
  }

  withTrimmedParam(params, "dateFrom", dateFrom);
  withTrimmedParam(params, "dateTo", dateTo);
  withTrimmedParam(params, "customerID", customerID);
  withTrimmedParam(params, "client", client);
  withTrimmedParam(params, "address", address);

  const { data } = await api.get(API_ROUTES.READINGS, {
    params,
  });

  return ReadingsResponseSchema.parse(data);
};

export const deleteReadings = async (readingIds: string[]) => {
  await api.post(API_ROUTES.READINGS_DELETE, { readingIds });
};

interface ExportReadingsParams {
  meterId?: number | null;
  dateFrom?: string;
  dateTo?: string;
  customerID?: string;
}

export const exportReadings = async ({
  meterId,
  dateFrom,
  dateTo,
  customerID,
}: ExportReadingsParams = {}) => {
  const params: Record<string, unknown> = {};

  if (Number.isInteger(meterId) && (meterId ?? 0) > 0) {
    params.meterId = meterId;
  }

  withTrimmedParam(params, "dateFrom", dateFrom);
  withTrimmedParam(params, "dateTo", dateTo);
  withTrimmedParam(params, "customerID", customerID);

  const response = await api.get(API_ROUTES.READINGS_EXPORT, {
    params,
    responseType: "blob",
  });

  const filename =
    getFilenameFromContentDisposition(response.headers["content-disposition"]) ??
    "Показания водомеров.xlsx";

  return {
    blob: response.data as Blob,
    filename,
  };
};
