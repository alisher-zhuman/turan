import { useAuthStore } from "@/shared/stores";
import { hasRoleAdmin } from "@/shared/helpers";

export const useReadingsAccess = () => {
  const user = useAuthStore((state) => state.user);

  return {
    isAdmin: hasRoleAdmin(user?.role),
  };
};
