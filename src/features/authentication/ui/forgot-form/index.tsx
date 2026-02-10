import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { sendForgotRequest } from "@/entities/authentication";
import { useToastMutation } from "@/shared/hooks";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { ForgotFormSchema } from "../../model/schema";
import type { ForgotFormValues } from "../../model/types";

export const ForgotForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(ForgotFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useToastMutation({
    mutationFn: ({ email }: ForgotFormValues) => sendForgotRequest(email),
    successMessage: "Инструкция для восстановления отправлена на почту.",
    errorMessage: (err: unknown) =>
      (err as { response?: { data?: { message?: string } }; message?: string })
        ?.response?.data?.message ||
      (err as { message?: string })?.message ||
      "Ошибка при восстановлении",
  });

  const onSubmit = (values: ForgotFormValues) => {
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
          Восстановление пароля
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormFieldset disabled={mutation.isPending}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </FormFieldset>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Отправка..." : "Отправить"}
          </Button>

        </Box>
      </Paper>
    </Box>
  );
};
