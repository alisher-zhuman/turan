import { api } from "@/shared/api";

export const getReadings = async (page = 1, limit = 10) => {
  const { data } = await api.get("/readings", {
    params: { page, limit },
  });

  return data;
};

export const deleteReadings = async (readingIds: string[]) => {
  const { data } = await api.post("/readings/delete", { readingIds });

  return data;
};
