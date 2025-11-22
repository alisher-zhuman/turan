import { Link } from "react-router";
import { Drawer } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Toolbar } from "@mui/material";
import { useAuthStore } from "@/store/auth";
import { SIDEBAR_LINKS } from "@/shared/utils/constants";

export const Sidebar = () => {
  const user = useAuthStore((state) => state.user);

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
        {filteredLinks.map(({ to, label }) => (
          <ListItem key={to} disablePadding>
            <ListItemButton component={Link} to={to}>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
