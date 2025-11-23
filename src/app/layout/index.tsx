import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Header } from "@/features/layout/header";
import { Sidebar } from "@/features/layout/sidebar";

export const Layout = () => (
  <>
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Header />

      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
        <Toolbar />

        <Outlet />
      </Box>
    </Box>

    <Toaster />
  </>
);
