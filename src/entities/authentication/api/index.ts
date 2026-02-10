import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";
import { SignInResponseSchema } from "../model/schemas";

export const signIn = async (email: string, password: string) => {
  const { data } = await api.post(API_ROUTES.AUTH_LOGIN, {
    email,
    password,
  });
  return SignInResponseSchema.parse(data);
};

export const sendForgotRequest = async (email: string) => {
  await api.post(API_ROUTES.USERS_PASSWORD_FORGOT, { email });
};
