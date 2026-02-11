import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { signIn } from "@/entities/authentication";
import { useAuthStore } from "@/shared/stores";
import { useToastMutation } from "@/shared/hooks";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { FormTextField } from "@/shared/ui/form-text-field";
import { getApiErrorMessage } from "@/shared/helpers";
import { ROUTES } from "@/shared/constants";
import { SignInFormSchema } from "../../model/schema";
import type { SignInFormValues } from "../../model/types";

export const SignInForm = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useToastMutation({
    mutationFn: ({ email, password }: SignInFormValues) =>
      signIn(email, password),
    onSuccess: (data) => {
      const { accessToken, ...user } = data;

      setAuth({
        user,
        accessToken,
      });

      navigate("/");
    },
    errorMessage: (err: unknown) => getApiErrorMessage(err, "Ошибка входа"),
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
          <FormFieldset disabled={mutation.isPending}>
            <FormTextField
              label="Логин"
              type="text"
              fullWidth
              required
              name="email"
              control={control}
            />

            <FormTextField
              label="Пароль"
              type="password"
              fullWidth
              required
              name="password"
              control={control}
            />
          </FormFieldset>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Вход..." : "Войти"}
          </Button>

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
