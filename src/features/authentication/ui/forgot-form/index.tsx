import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { FormActions } from "@/shared/ui/form-actions";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { FormTextField } from "@/shared/ui/form-text-field";

import { useForgotForm } from "../../hooks/useForgotForm";

export const ForgotForm = () => {
  const { control, onSubmit, isPending } = useForgotForm();

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
          onSubmit={onSubmit}
        >
          <FormFieldset disabled={isPending}>
            <FormTextField
              label="Email"
              type="email"
              fullWidth
              required
              name="email"
              control={control}
            />
          </FormFieldset>

          <FormActions
            isSubmitting={isPending}
            submitLabel="Отправить"
            submitLabelLoading="Отправка..."
            align="center"
            fullWidth
            submitProps={{ size: "large" }}
          />

        </Box>
      </Paper>
    </Box>
  );
};
