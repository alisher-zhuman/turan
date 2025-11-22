import { Outlet } from "react-router";
import { Box, Toolbar } from "@mui/material";
import { Header } from "@/shared/ui/header";
import { Sidebar } from "@/shared/ui/sidebar";

export const Layout = () => (
  <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
    <Header />

    <Sidebar />

    <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
      <Toolbar />

      <Outlet />
    </Box>
  </Box>
);
