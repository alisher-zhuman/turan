import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export const SignInForm = () => {
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
        >
          <TextField label="Логин" type="text" fullWidth required />

          <TextField label="Пароль" type="password" fullWidth required />

          <Button variant="contained" size="large" fullWidth>
            Войти
          </Button>

          <Button
            variant="text"
            fullWidth
            href="/sign-in/forgot"
            sx={{ mt: 1 }}
          >
            Забыли пароль?
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
