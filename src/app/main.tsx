import "./styles/index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";

import { QUERY_CLIENT } from "./configs/query";
import { ROUTER } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={QUERY_CLIENT}>
      <Toaster />

      <RouterProvider router={ROUTER} />
    </QueryClientProvider>
  </StrictMode>,
);
