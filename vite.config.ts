import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { VITE_ALIASES } from "./vite/aliases";
import { getVendorChunkName } from "./vite/chunks";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: VITE_ALIASES,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: getVendorChunkName,
      },
    },
  },
});
