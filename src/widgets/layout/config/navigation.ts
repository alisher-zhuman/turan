import { ROLE } from "@/shared/constants";
import { ROUTES } from "@/shared/constants/routes";
import type { Role } from "@/shared/types";

interface SidebarLink {
  label: string;
  to: string;
  roles: Role[];
}

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
    label: "Водомеры",
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

export const getAllowedPathsByRole = (role: Role): string[] => {
  return SIDEBAR_LINKS.filter((link) => link.roles.includes(role)).map(
    (link) => link.to,
  );
};
