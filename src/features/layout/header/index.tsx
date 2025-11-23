import { Link, useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuthStore } from "@/features/authentication/store/auth";
import { ROLE_LABELS } from "@/shared/utils/constants";

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user && (
            <>
              <Typography variant="body2">{ROLE_LABELS[user.role]}</Typography>

              {user.role !== "super_admin" && user.company && (
                <Typography variant="body2">{user.company.name}</Typography>
              )}

              <Typography variant="body2">{`${user.firstName} ${user.lastName}`}</Typography>
            </>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!user && (
            <Button
              component={Link}
              to="/sign-in"
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
                  to="/sign-in/forgot"
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
