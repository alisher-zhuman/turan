import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "@/features/authentication/store/auth";
import { getAllowedPathsByRole } from "@/shared/utils/helpers";
import { ROUTES } from "@/shared/utils/constants/routes";

interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);

  const location = useLocation();

  if (!accessToken) {
    return <Navigate to={`/${ROUTES.SIGN_IN}`} replace />;
  }

  if (!user) {
    return null;
  }

  const allowedPaths = getAllowedPathsByRole(user.role);
  const firstAllowed = allowedPaths[0];

  if (allowedPaths.length === 0) {
    return <Navigate to={`/${ROUTES.SIGN_IN}`} replace />;
  }

  if (!allowedPaths.includes(location.pathname)) {
    return <Navigate to={firstAllowed} replace />;
  }

  return <>{children}</>;
};
