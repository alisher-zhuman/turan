import { isRouteErrorResponse } from "react-router";

export const getRouteError = (routeError: unknown) => {
  if (routeError instanceof Error) {
    return routeError;
  }

  if (isRouteErrorResponse(routeError)) {
    const errorDetails =
      typeof routeError.data === "string"
        ? routeError.data
        : routeError.statusText || "Route error";

    return new Error(`${routeError.status}: ${errorDetails}`);
  }

  return new Error("Неизвестная ошибка маршрута");
};
