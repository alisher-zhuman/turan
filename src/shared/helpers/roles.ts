import type { Role } from "@/shared/types";
import { ROLE } from "../constants";

export const hasRoleAdmin = (role: Role | undefined) => role === ROLE.ADMIN;

export const hasRoleSuperAdmin = (role: Role | undefined) => {
  return role === ROLE.SUPER_ADMIN;
};

export const hasAnyRole = (role: Role | undefined, roles: Role[]) => {
  if (!role) return false;

  return roles.includes(role);
};

export const canEditMeters = (role: Role | undefined) => {
  return hasAnyRole(role, [ROLE.ADMIN, ROLE.CONTROLLER]);
};

export const canManageMetersToGroups = (role: Role | undefined) => {
  return hasAnyRole(role, [ROLE.ADMIN, ROLE.CONTROLLER, ROLE.USER]);
};

export const canDeleteUsers = (role: Role | undefined) => {
  return hasAnyRole(role, [ROLE.ADMIN, ROLE.SUPER_ADMIN]);
};

export const availableUserRolesFor = (role: Role | undefined) => {
  return hasRoleSuperAdmin(role)
    ? [ROLE.ADMIN, ROLE.SUPER_ADMIN]
    : [ROLE.ADMIN, ROLE.USER, ROLE.CONTROLLER];
};

export const canSelectCompanyForRole = (
  actorRole: Role | undefined,
  targetRole: Role,
) => {
  return hasRoleSuperAdmin(actorRole) && targetRole === ROLE.ADMIN;
};
