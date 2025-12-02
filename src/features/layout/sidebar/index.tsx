import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthStore } from "@/features/authentication/store/auth";
import { ROLE_LABELS, SIDEBAR_LINKS } from "@/shared/utils/constants";
import { getRoleIcon, getSidebarIcon } from "@/shared/utils/helpers";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const user = useAuthStore((state) => state.user);

  const theme = useTheme();

  const { pathname } = useLocation();

  if (!user) return;

  const filteredLinks = SIDEBAR_LINKS.filter(({ roles }) =>
    roles.includes(user.role)
  );

  const drawerWidth = collapsed ? 72 : 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: 1,
          marginTop: 8,
        }}
      >
        {!collapsed && user && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              pl: 1,
            }}
          >
            {(() => {
              const RoleIcon = getRoleIcon(user.role);
              const roleLabel = ROLE_LABELS[user.role];

              return (
                <>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "primary.contrastText",
                    }}
                  >
                    <RoleIcon sx={{ fontSize: 18 }} />
                  </Box>

                  <Typography variant="subtitle2" noWrap fontWeight={600}>
                    {roleLabel}
                  </Typography>
                </>
              );
            })()}
          </Box>
        )}

        <IconButton size="small" onClick={() => setCollapsed((prev) => !prev)}>
          {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Toolbar>

      <List>
        {filteredLinks.map(({ to, label }) => {
          const isActive = pathname.startsWith(to);
          const Icon = getSidebarIcon(to);

          return (
            <ListItem key={to} disablePadding sx={{ display: "block" }}>
              <Tooltip title={collapsed ? label : ""} placement="right" arrow>
                <ListItemButton
                  component={Link}
                  to={to}
                  sx={{
                    minHeight: 48,
                    justifyContent: collapsed ? "center" : "flex-start",
                    px: 2.5,
                    backgroundColor: isActive
                      ? "rgba(33, 150, 243, 0.12)"
                      : "transparent",
                    transition: theme.transitions.create(["background-color"], {
                      duration: theme.transitions.duration.shortest,
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapsed ? 0 : 2,
                      justifyContent: "center",
                      transition: theme.transitions.create(["margin"], {
                        duration: theme.transitions.duration.shortest,
                      }),
                    }}
                  >
                    <Icon />
                  </ListItemIcon>

                  <ListItemText
                    primary={label}
                    sx={{
                      opacity: collapsed ? 0 : 1,
                      whiteSpace: "nowrap",
                      transition: theme.transitions.create("opacity", {
                        duration: theme.transitions.duration.shortest,
                      }),
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
