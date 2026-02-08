import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@features": path.resolve(__dirname, "src/features"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "mui-vendor": [
            "@mui/material",
            "@emotion/react",
            "@emotion/styled",
            "@popperjs/core",
          ],
          "router-vendor": ["react-router"],
          "query-vendor": ["@tanstack/react-query"],
          "http-vendor": ["axios"],
        },
      },
    },
  },
});
