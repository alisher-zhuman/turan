import { useAuthStore } from "@/shared/stores";
import {
  canEditMeters,
  canManageMetersToGroups as canManageMetersToGroupsRole,
  hasRoleAdmin,
} from "@/shared/helpers";

export const useMeterAccess = () => {
  const user = useAuthStore((state) => state.user);

  return {
    isAdmin: hasRoleAdmin(user?.role),
    canEdit: canEditMeters(user?.role),
    canManageMetersToGroups: canManageMetersToGroupsRole(user?.role),
  };
};
