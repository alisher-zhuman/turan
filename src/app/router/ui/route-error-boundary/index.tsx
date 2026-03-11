import { useRouteError } from "react-router";

import { ErrorFallback } from "@/app/ui/error-fallback";

import { getRouteError } from "../../helpers/route-error";

export const RouteErrorBoundary = () => {
  const routeError = useRouteError();

  return <ErrorFallback error={getRouteError(routeError)} componentStack="" />;
};
