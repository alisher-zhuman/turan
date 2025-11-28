import axios from "axios";
import { useAuthStore } from "@/features/authentication/store/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let isLoggingOut = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      const { logout } = useAuthStore.getState();
      logout();
    }

    return Promise.reject(error);
  }
);
