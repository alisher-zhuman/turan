import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "@/store/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, accessToken } = useAuthStore();

  const location = useLocation();

  if (!accessToken) return <Navigate to="/sign-in" replace />;

  if (user?.role === "super_admin") {
    const allowedPaths = ["/companies", "/users"];

    if (!allowedPaths.includes(location.pathname)) {
      return <Navigate to="/companies" replace />;
    }
  }

  return <>{children}</>;
};
