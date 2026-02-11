import type { ApiErrorLike } from "../types";

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Ошибка запроса",
) => {
  if (typeof error === "string") return error;

  const apiError = error as ApiErrorLike | null;

  const message = apiError?.response?.data?.message;

  if (Array.isArray(message)) {
    return message[0] || fallback;
  }

  if (typeof message === "string" && message) {
    return message;
  }

  const responseError = apiError?.response?.data?.error;
  if (responseError) return responseError;

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return apiError?.message || fallback;
};
