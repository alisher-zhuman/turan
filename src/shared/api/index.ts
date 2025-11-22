import axios from "axios";

export const api = axios.create({
  baseURL: "https://1c6b9b428934.ngrok-free.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
