import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import type { Role } from "@/shared/types";
import { ROLE_LABELS, ROLES } from "@/shared/utils/constants";
import { createUser } from "../../api";
import type { CreateUserPayload } from "../../interfaces";

interface Props {
  companyId: number;
  onClose: () => void;
}

export const CreateUserForm = ({ companyId, onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<Role>("user");
  const [errors, setErrors] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
      toast.success("Пользователь успешно создан");
    },
    onError: (error: AxiosError<{ message?: string; errors?: string[] }>) => {
      const messages = error.response?.data?.errors || [
        error.response?.data?.message || "Ошибка при создании пользователя",
      ];
      setErrors(messages);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: string[] = [];

    if (!email || email.length < 3) {
      validationErrors.push("Email должен быть не менее 3 символов");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.push("Email должен быть валидным");
    }

    if (!firstName || firstName.length < 3) {
      validationErrors.push("Имя должно быть не менее 3 символов");
    }
    if (!lastName || lastName.length < 3) {
      validationErrors.push("Фамилия должно быть не менее 3 символов");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    mutation.mutate({ email, firstName, lastName, role, companyId });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {errors.map((err, i) => (
        <Alert key={i} severity="error">
          {err}
        </Alert>
      ))}

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        type="email"
      />

      <TextField
        label="Имя"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
        required
      />

      <TextField
        label="Фамилия"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
        required
      />

      <TextField
        select
        label="Роль"
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        fullWidth
        required
      >
        {ROLES.map((r) => (
          <MenuItem key={r} value={r}>
            {ROLE_LABELS[r]}
          </MenuItem>
        ))}
      </TextField>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Создание..." : "Создать"}
      </Button>
    </Box>
  );
};
