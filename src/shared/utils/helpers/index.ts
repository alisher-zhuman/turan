import toast from "react-hot-toast";
import { SIDEBAR_LINKS } from "../constants";

export const getAllowedPathsByRole = (role: string): string[] => {
  return SIDEBAR_LINKS.filter((l) => l.roles.includes(role)).map((l) => l.to);
};

export const copyToClipboard = (value: string | undefined) => {
  if (!value) return;
  navigator.clipboard.writeText(value);
  toast.success("Скопировано в буфер обмена");
};
