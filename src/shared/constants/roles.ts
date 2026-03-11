import type { Role } from "../types";

export const ROLE = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
  CONTROLLER: "controller",
};

export const ROLE_LABELS: Record<Role, string> = {
  [ROLE.SUPER_ADMIN]: "Супер админ",
  [ROLE.ADMIN]: "Админ",
  [ROLE.USER]: "Пользователь",
  [ROLE.CONTROLLER]: "Контроллер",
};
