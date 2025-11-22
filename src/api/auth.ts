import { api } from ".";

export const logIn = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login/web", { email, password });

  return data;
};
