import axios from "axios";
import { useAuthStore } from "@/shared/stores";

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

      try {
        logout();
      } finally {
        isLoggingOut = false;
      }
    }

    return Promise.reject(error);
  },
);
