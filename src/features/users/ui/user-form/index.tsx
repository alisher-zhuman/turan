import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { getCompanies, type Company } from "@/entities/companies";
import { useAuthStore } from "@/shared/stores";
import { useToastMutation } from "@/shared/hooks";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { FormSelect } from "@/shared/ui/form-select";
import { FormTextField } from "@/shared/ui/form-text-field";
import {
  getApiErrorMessage,
  availableUserRolesFor,
  canSelectCompanyForRole,
  hasRoleSuperAdmin,
} from "@/shared/helpers";
import type { Role } from "@/shared/types";
import {
  createUser,
  editUser,
  type CreateUserPayload,
  type UserRow,
} from "@/entities/users";
import { ROLE, ROLE_LABELS } from "@/shared/constants";
import { createUserFormSchema } from "../../model/schema";
import type { UserFormValues } from "../../model/types";

interface Props {
  onClose: () => void;
  userToEdit?: UserRow | null;
}

export const UserForm = ({ onClose, userToEdit }: Props) => {
  const user = useAuthStore((state) => state.user);

  const isEditing = !!userToEdit;

  const schema = useMemo(
    () => createUserFormSchema(user?.role, isEditing),
    [user?.role, isEditing],
  );

  const {
    control,
    handleSubmit,
    reset,
    watch,
  } = useForm<UserFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: userToEdit?.email ?? "",
      firstName: userToEdit?.firstName ?? "",
      lastName: userToEdit?.lastName ?? "",
      role: userToEdit?.role ?? ROLE.ADMIN,
      companyId: userToEdit?.company?.id ?? null,
    },
  });

  useEffect(() => {
    reset({
      email: userToEdit?.email ?? "",
      firstName: userToEdit?.firstName ?? "",
      lastName: userToEdit?.lastName ?? "",
      role: userToEdit?.role ?? ROLE.ADMIN,
      companyId: userToEdit?.company?.id ?? null,
    });
  }, [userToEdit, reset]);

  const watchedRole = watch("role") as Role;

  const { data: companies, isLoading: isCompaniesLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanies(false),
    enabled: hasRoleSuperAdmin(user?.role),
  });

  const mutation = useToastMutation({
    mutationFn: (payload: CreateUserPayload) =>
      isEditing ? editUser(userToEdit!.id, payload) : createUser(payload),
    invalidateKeys: [["users"]],
    successMessage: (_, variables) => {
      const role = variables.role ?? ROLE.ADMIN;
      return isEditing
        ? `${ROLE_LABELS[role]} успешно обновлён`
        : `${ROLE_LABELS[role]} успешно создан`;
    },
    onError: (error: AxiosError<{ message?: string; errors?: string[] }>) => {
      const messages = error.response?.data?.errors || [
        getApiErrorMessage(error, "Ошибка при сохранении пользователя"),
      ];
      messages.forEach((message) => toast.error(message));
    },
    onSuccess: () => {
      onClose();
    },
  });

  const availableRoles = availableUserRolesFor(user?.role);

  const showCompanySelect = canSelectCompanyForRole(user?.role, watchedRole);

  const onSubmit = (values: UserFormValues) => {
    mutation.mutate({
      ...(!isEditing && { email: values.email }),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      role: values.role as Role,
      ...(showCompanySelect ? { companyId: values.companyId! } : {}),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <FormFieldset disabled={mutation.isPending}>
        {!isEditing && (
          <FormTextField
            label="Email"
            fullWidth
            required
            type="email"
            name="email"
            control={control}
          />
        )}

        <FormTextField
          label="Имя"
          fullWidth
          required
          name="firstName"
          control={control}
        />

        <FormTextField
          label="Фамилия"
          fullWidth
          required
          name="lastName"
          control={control}
        />

        <FormSelect
          name="role"
          control={control}
          label="Роль"
          fullWidth
          required
        >
          {availableRoles.map((r) => (
            <MenuItem key={r} value={r}>
              {ROLE_LABELS[r]}
            </MenuItem>
          ))}
        </FormSelect>

        {showCompanySelect && (
          <FormSelect
            name="companyId"
            control={control}
            label="Компания"
            fullWidth
            required
            disabled={isCompaniesLoading || mutation.isPending}
            parseValue={(value) => (value ? Number(value) : null)}
          >
            {companies?.map(({ id, name }: Company) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </FormSelect>
        )}
      </FormFieldset>

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
