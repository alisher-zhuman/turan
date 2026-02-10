import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";
import { WebhooksResponseSchema } from "../model/schemas";

export const getWebhooks = async () => {
  const { data } = await api.get(API_ROUTES.WEBHOOKS);
  return WebhooksResponseSchema.parse(data);
};

export const createWebhook = async (url: string) => {
  await api.post(API_ROUTES.WEBHOOKS, undefined, {
    params: { url },
  });
};

export const deleteWebhook = async (id: number) => {
  await api.delete(`${API_ROUTES.WEBHOOKS}/${id}`);
};
