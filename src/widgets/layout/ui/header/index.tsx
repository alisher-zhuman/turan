import { Link, useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuthStore } from "@/shared/stores";
import { ROLE_LABELS, ROUTES } from "@/shared/constants";
import { hasRoleSuperAdmin } from "@/shared/helpers";

export const Header = () => {
  const { user, logout } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(`/${ROUTES.SIGN_IN}`);
  };

  const TITLES = user
    ? [
        !hasRoleSuperAdmin(user.role) && user.company?.name,
        `${user.firstName} ${user.lastName}`,
        ROLE_LABELS[user.role],
      ].filter(Boolean)
    : [];

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user && (
            <Typography variant="body2">{TITLES.join(" | ")}</Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!user && (
            <Button
              component={Link}
              to={`/${ROUTES.SIGN_IN}`}
              color="inherit"
              sx={{ ":hover": { background: "inherit" } }}
            >
              Войти
            </Button>
          )}

          {user && (
            <>
              {user.passwordChange && (
                <Button
                  component={Link}
                  to={`/${ROUTES.FORGOT}`}
                  color="inherit"
                  sx={{ ":hover": { background: "inherit" } }}
                >
                  Сменить пароль
                </Button>
              )}

              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ ":hover": { background: "inherit" } }}
              >
                Выйти
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
