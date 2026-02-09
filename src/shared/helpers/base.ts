import type { Role } from "@/shared/types";
import { SIDEBAR_LINKS } from "../constants";

export const getAllowedPathsByRole = (role: Role): string[] => {
  return SIDEBAR_LINKS.filter((l) => l.roles.includes(role)).map((l) => l.to);
};
