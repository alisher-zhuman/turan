import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { signIn } from "@/entities/authentication";
import { useAuthStore } from "@/shared/stores";
import { ROUTES } from "@/shared/constants";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    signIn(email, password)
      .then((data) => {
        const { accessToken, ...user } = data;

        setAuth({
          user,
          accessToken,
        });

        navigate("/");
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "Ошибка входа");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 360, borderRadius: 3 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Войти
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Логин"
            type="text"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Пароль"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? "Вход..." : "Войти"}
          </Button>

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          <Button
            variant="text"
            href={`/${ROUTES.FORGOT}`}
            sx={{ mt: 1, width: "fit-content", margin: "auto" }}
          >
            Забыли пароль?
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
