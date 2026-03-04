import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";

import { LogInResponseSchema } from "../model/schemas";

export const logIn = async (email: string, password: string) => {
  const { data } = await api.post(API_ROUTES.AUTH_LOG_IN, {
    email,
    password,
  });
  return LogInResponseSchema.parse(data);
};

export const sendForgotPasswordRequest = async (email: string) => {
  await api.post(API_ROUTES.USERS_PASSWORD_FORGOT_PASSWORD, { email });
};
