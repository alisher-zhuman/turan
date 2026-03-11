import { SIDEBAR_LINKS } from "../constants/navigation";
import type { Role } from "../types";

export const getAllowedPathsByRole = (role: Role): string[] => {
  return SIDEBAR_LINKS.filter((link) => link.roles.includes(role)).map(
    (link) => link.to,
  );
};
