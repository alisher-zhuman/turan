export const MENU = [
  { label: "Компании", to: "/companies" },
  { label: "Пользователи", to: "/users" },
  { label: "Устройства", to: "/devices" },
  { label: "Группы", to: "/groups" },
  { label: "Счётчики", to: "/meters" },
  { label: "Показания", to: "/readings" },
  { label: "Вебхуки", to: "/webhooks" },
];

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
