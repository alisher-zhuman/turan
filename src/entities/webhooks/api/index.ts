import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";
import { WebhooksResponseSchema } from "./schema";

export const getWebhooks = async () => {
  const { data } = await api.get(API_ROUTES.WEBHOOKS);
  return WebhooksResponseSchema.parse(data);
};

export const createWebhook = async (url: string) => {
  const { data } = await api.post(API_ROUTES.WEBHOOKS, undefined, {
    params: { url },
  });
  return data;
};

export const deleteWebhook = async (id: number) => {
  const { data } = await api.delete(`${API_ROUTES.WEBHOOKS}/${id}`);
  return data;
};
