import { fileURLToPath, URL } from "node:url";

const resolveAliasPath = (value: string) =>
  fileURLToPath(new URL(value, import.meta.url));

export const VITE_ALIASES = {
  "@": resolveAliasPath("../src"),
  "@pages": resolveAliasPath("../src/pages"),
  "@widgets": resolveAliasPath("../src/widgets"),
  "@features": resolveAliasPath("../src/features"),
  "@entities": resolveAliasPath("../src/entities"),
  "@shared": resolveAliasPath("../src/shared"),
};
