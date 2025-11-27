import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "@/features/authentication/store/auth";
import { getAllowedPathsByRole } from "@/shared/utils/helpers";

interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { user, accessToken } = useAuthStore();

  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!user) {
    return null;
  }

  const allowedPaths = getAllowedPathsByRole(user.role);
  const firstAllowed = allowedPaths[0];

  if (allowedPaths.length === 0) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!allowedPaths.includes(location.pathname)) {
    return <Navigate to={firstAllowed} replace />;
  }

  return <>{children}</>;
};
