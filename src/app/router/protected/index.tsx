import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "@/shared/store/auth";
import { getAllowedPathsByRole } from "@/shared/utils/helpers";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, accessToken } = useAuthStore();
  const location = useLocation();

  if (!accessToken) return <Navigate to="/sign-in" replace />;

  if (!user) return null;

  const allowedPaths = getAllowedPathsByRole(user.role);

  if (allowedPaths.length === 0) return <Navigate to="/sign-in" replace />;

  const firstAllowed = allowedPaths[0];

  if (!allowedPaths.includes(location.pathname)) {
    return <Navigate to={firstAllowed} replace />;
  }

  return <>{children}</>;
};
