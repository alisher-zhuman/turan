import { api } from "@/shared/api";

export const getWebhooks = async () => {
  const { data } = await api.get("/webhook");
  return data;
};

export const createWebhook = async (url: string) => {
  const { data } = await api.post("/webhook", undefined, { params: { url } });
  return data;
};

export const deleteWebhook = async (id: number) => {
  const { data } = await api.delete(`/webhook/${id}`);
  return data;
};
