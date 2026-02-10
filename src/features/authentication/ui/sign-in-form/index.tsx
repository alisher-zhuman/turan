import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { signIn } from "@/entities/authentication";
import { useAuthStore } from "@/shared/stores";
import { ROUTES } from "@/shared/constants";
import { SignInFormSchema } from "../../model/schema";
import type { SignInFormValues } from "../../model/types";

export const SignInForm = () => {
  const [error, setError] = useState("");

  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: ({ email, password }: SignInFormValues) =>
      signIn(email, password),
    onMutate: () => {
      setError("");
    },
    onSuccess: (data) => {
      const { accessToken, ...user } = data;

      setAuth({
        user,
        accessToken,
      });

      navigate("/");
    },
    onError: (err: unknown) => {
      const errorMessage =
        (err as { response?: { data?: { message?: string } }; message?: string })
          ?.response?.data?.message ||
        (err as { message?: string })?.message ||
        "Ошибка входа";
      setError(errorMessage);
    },
  });

  const onSubmit = (values: SignInFormValues) => {
    mutation.mutate(values);
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Логин"
            type="text"
            fullWidth
            required
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Пароль"
            type="password"
            fullWidth
            required
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Вход..." : "Войти"}
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
