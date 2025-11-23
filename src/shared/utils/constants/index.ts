import type { Role } from "@/shared/types";

export const SIDEBAR_LINKS = [
  {
    label: "Компании",
    to: "/companies",
    roles: ["super_admin"],
  },
  {
    label: "Пользователи",
    to: "/users",
    roles: ["super_admin", "admin"],
  },
  {
    label: "Устройства",
    to: "/devices",
    roles: ["admin"],
  },
  {
    label: "Группы",
    to: "/groups",
    roles: ["admin", "user", "controller"],
  },
  {
    label: "Счётчики",
    to: "/meters",
    roles: ["admin", "user", "controller"],
  },
  {
    label: "Показания",
    to: "/readings",
    roles: ["admin", "user", "controller"],
  },
  {
    label: "Вебхуки",
    to: "/webhooks",
    roles: ["admin"],
  },
];

export const ROLE_LABELS = {
  super_admin: "Супер админ",
  admin: "Админ",
  user: "Пользователь",
  controller: "Контроллер",
};

export const ROLES: Role[] = ["super_admin", "admin", "user", "controller"];
