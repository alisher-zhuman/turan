import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import { getCompanies } from "@/entities/companies";
import { useAuthStore } from "@/features/authentication/store/auth";

import type { Company, Role, User } from "@/shared/types";
import { createUser, editUser, type CreateUserPayload } from "@/entities/users";
import { ROLE, ROLE_LABELS } from "@/shared/utils/constants/roles";
import {
  availableUserRolesFor,
  canSelectCompanyForRole,
  hasRoleSuperAdmin,
} from "@/shared/utils/helpers/roles";

interface Props {
  onClose: () => void;
  userToEdit?: Omit<User, "devices"> | null;
}

export const UserForm = ({ onClose, userToEdit }: Props) => {
  const [email, setEmail] = useState(userToEdit?.email || "");
  const [firstName, setFirstName] = useState(userToEdit?.firstName || "");
  const [lastName, setLastName] = useState(userToEdit?.lastName || "");
  const [role, setRole] = useState<Role>(userToEdit?.role || ROLE.ADMIN);
  const [companyId, setCompanyId] = useState<number | null>(
    userToEdit?.company?.id ?? null,
  );
  const [errors, setErrors] = useState<string[]>([]);

  const user = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();

  const isEditing = !!userToEdit;

  const { data: companies, isLoading: isCompaniesLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanies(false),
    enabled: hasRoleSuperAdmin(user?.role),
  });

  const mutation = useMutation({
    mutationFn: (payload: CreateUserPayload) =>
      isEditing ? editUser(userToEdit!.id, payload) : createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
      toast.success(
        isEditing
          ? `${ROLE_LABELS[role]} успешно обновлён`
          : `${ROLE_LABELS[role]} успешно создан`,
      );
    },
    onError: (error: AxiosError<{ message?: string; errors?: string[] }>) => {
      const messages = error.response?.data?.errors || [
        error.response?.data?.message || "Ошибка при сохранении пользователя",
      ];
      setErrors(messages);
    },
  });

  const availableRoles = availableUserRolesFor(user?.role);

  const showCompanySelect = canSelectCompanyForRole(user?.role, role);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: string[] = [];

    if (!isEditing) {
      if (!email || email.length < 3) {
        validationErrors.push("Email должен быть не менее 3 символов");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        validationErrors.push("Email должен быть валидным");
      }
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
      ...(!isEditing && { email }),
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

      {!isEditing && (
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          type="email"
        />
      )}

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
          value={companyId ?? ""}
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
        {mutation.isPending
          ? isEditing
            ? "Обновление..."
            : "Создание..."
          : isEditing
            ? "Сохранить"
            : "Создать"}
      </Button>
    </Box>
  );
};
