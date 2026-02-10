import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";
import { ReadingsResponseSchema } from "../model/schemas";

export const getReadings = async (page = 1, limit = 10) => {
  const { data } = await api.get(API_ROUTES.READINGS, {
    params: { page, limit },
  });
  return ReadingsResponseSchema.parse(data);
};

export const deleteReadings = async (readingIds: string[]) => {
  await api.post(API_ROUTES.READINGS_DELETE, { readingIds });
};
