import {
  canDeleteUsers,
  canEditMeters,
  canManageMetersToGroups,
  hasRoleAdmin,
  hasRoleSuperAdmin,
} from "@/shared/helpers";
import { useAuthStore } from "@/shared/stores";

export const useRoleAccess = () => {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);

  const role = user?.role;

  return {
    user,
    role,
    accessToken,
    logout,
    isAdmin: hasRoleAdmin(role),
    isSuperAdmin: hasRoleSuperAdmin(role),
    canEditMeters: canEditMeters(role),
    canManageMetersToGroups: canManageMetersToGroups(role),
    canDeleteUsers: canDeleteUsers(role),
  };
};
