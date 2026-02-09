import type { Role } from "@/shared/types";

export const ROLE = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
  CONTROLLER: "controller",
};

export const ROLES: Role[] = [
  ROLE.SUPER_ADMIN,
  ROLE.ADMIN,
  ROLE.USER,
  ROLE.CONTROLLER,
];

export const ROLE_LABELS: Record<Role, string> = {
  [ROLE.SUPER_ADMIN]: "Супер админ",
  [ROLE.ADMIN]: "Админ",
  [ROLE.USER]: "Пользователь",
  [ROLE.CONTROLLER]: "Контроллер",
};
