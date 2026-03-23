import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { VITE_ALIASES } from "./vite/aliases";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: VITE_ALIASES,
  },
});
