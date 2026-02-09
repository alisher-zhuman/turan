import type { SidebarLink } from "@/shared/types";
import { ROUTES } from "./routes";
import { ROLE } from "./roles";

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    label: "Компании",
    to: `/${ROUTES.COMPANIES}`,
    roles: [ROLE.SUPER_ADMIN],
  },
  {
    label: "Пользователи",
    to: `/${ROUTES.USERS}`,
    roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
  },
  {
    label: "Устройства",
    to: `/${ROUTES.DEVICES}`,
    roles: [ROLE.ADMIN],
  },
  {
    label: "Группы",
    to: `/${ROUTES.GROUPS}`,
    roles: [ROLE.ADMIN, ROLE.USER, ROLE.CONTROLLER],
  },
  {
    label: "Счётчики",
    to: `/${ROUTES.METERS}`,
    roles: [ROLE.ADMIN, ROLE.USER, ROLE.CONTROLLER],
  },
  {
    label: "Показания",
    to: `/${ROUTES.READINGS}`,
    roles: [ROLE.ADMIN, ROLE.USER, ROLE.CONTROLLER],
  },
  {
    label: "Вебхуки",
    to: `/${ROUTES.WEBHOOKS}`,
    roles: [ROLE.ADMIN],
  },
];

export const AUTH_STORAGE_KEY = "turan_auth";
