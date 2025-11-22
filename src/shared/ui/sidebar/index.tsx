import { Link, useLocation } from "react-router";
import { Drawer } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Toolbar } from "@mui/material";
import { useAuthStore } from "@/shared/store/auth";
import { SIDEBAR_LINKS } from "@/shared/utils/constants";

export const Sidebar = () => {
  const user = useAuthStore((state) => state.user);

  const { pathname } = useLocation();

  if (!user) return null;

  const filteredLinks = SIDEBAR_LINKS.filter(({ roles }) =>
    roles.includes(user.role)
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        {filteredLinks.map(({ to, label }) => {
          const isActive = pathname.startsWith(to);

          return (
            <ListItem key={to} disablePadding>
              <ListItemButton
                component={Link}
                to={to}
                sx={{
                  backgroundColor: isActive
                    ? "rgba(33, 150, 243, 0.12)"
                    : "transparent",
                }}
              >
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
