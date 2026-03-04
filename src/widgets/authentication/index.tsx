import { useLocation, useNavigate } from "react-router";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { ForgotPasswordForm, LogInForm } from "@/features/authentication";

import { ROUTES } from "@/shared/constants";

export const AuthenticationWidget = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const isForgotPassword = pathname.includes(`/${ROUTES.FORGOT_PASSWORD}`);

  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      {isForgotPassword && (
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ position: "absolute", top: 16, left: 16 }}
        >
          Назад
        </Button>
      )}

      {isForgotPassword ? <ForgotPasswordForm /> : <LogInForm />}
    </Box>
  );
};
