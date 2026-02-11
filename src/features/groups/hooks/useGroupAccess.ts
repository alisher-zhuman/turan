import { useAuthStore } from "@/shared/stores";
import {
  canManageMetersToGroups as canManageMetersToGroupsRole,
  hasRoleAdmin,
} from "@/shared/helpers";

export const useGroupAccess = () => {
  const { user } = useAuthStore();

  return {
    isAdmin: hasRoleAdmin(user?.role),
    canManageMetersToGroups: canManageMetersToGroupsRole(user?.role),
  };
};
