import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router";

import "@/shared/config/env";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { QUERY_CLIENT } from "./configs/query";
import { APP_THEME } from "./configs/theme";
import { ROUTER } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={APP_THEME}>
      <CssBaseline />

      <QueryClientProvider client={QUERY_CLIENT}>
        <Toaster />

        <RouterProvider router={ROUTER} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
