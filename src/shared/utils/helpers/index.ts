import { SIDEBAR_LINKS } from "../constants";

export const getAllowedPathsByRole = (role: string): string[] => {
  return SIDEBAR_LINKS.filter((l) => l.roles.includes(role)).map((l) => l.to);
};
