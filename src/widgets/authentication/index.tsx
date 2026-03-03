import { useLocation, useNavigate } from "react-router";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { ForgotForm, SignInForm } from "@/features/authentication";

export const AuthenticationWidget = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const isForgot = pathname.includes("forgot");

  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      {isForgot && (
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ position: "absolute", top: 16, left: 16 }}
        >
          Назад
        </Button>
      )}

      {isForgot ? <ForgotForm /> : <SignInForm />}
    </Box>
  );
};
