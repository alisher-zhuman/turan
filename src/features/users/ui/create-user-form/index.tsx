import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import type { Company } from "@/features/companies/interfaces/companies";
import { getCompanies } from "@/features/companies/api/companies";
import { useAuthStore } from "@/features/authentication/store/auth";
import type { Role } from "@/shared/types";
import { createUser } from "../../api";
import type { CreateUserPayload } from "../../interfaces";
import { ROLE_LABELS } from "@/shared/utils/constants";

interface Props {
  onClose: () => void;
}

export const CreateUserForm = ({ onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<Role>("admin");
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const user = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();

  const { data: companies, isLoading: isCompaniesLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanies(false),
  });

  const mutation = useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: ({ role }: { role: Role }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
      toast.success(`${ROLE_LABELS[role]} успешно создан`);
    },
    onError: (error: AxiosError<{ message?: string; errors?: string[] }>) => {
      const messages = error.response?.data?.errors || [
        error.response?.data?.message || "Ошибка при создании пользователя",
      ];
      setErrors(messages);
    },
  });

  const availableRoles: Role[] =
    user?.role === "super_admin"
      ? ["admin", "super_admin"]
      : ["admin", "user", "controller"];

  const showCompanySelect = user?.role === "super_admin" && role === "admin";

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

    if (showCompanySelect && !companyId) {
      validationErrors.push("Выберите компанию");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    mutation.mutate({
      email,
      firstName,
      lastName,
      role,
      ...(showCompanySelect ? { companyId: companyId! } : {}),
    });
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
        {availableRoles.map((r) => (
          <MenuItem key={r} value={r}>
            {ROLE_LABELS[r]}
          </MenuItem>
        ))}
      </TextField>

      {showCompanySelect && (
        <TextField
          select
          label="Компания"
          value={companyId}
          onChange={(e) => setCompanyId(+e.target.value)}
          fullWidth
          required
          disabled={isCompaniesLoading}
        >
          {companies?.map(({ id, name }: Company) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      )}

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
