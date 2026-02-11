import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { getCompanies, companiesKeys, type Company } from "@/entities/companies";
import { useAuthStore } from "@/shared/stores";
import { useFormReset, useToastMutation } from "@/shared/hooks";
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
  usersKeys,
  type CreateUserPayload,
  type UserRow,
} from "@/entities/users";
import { ROLE, ROLE_LABELS } from "@/shared/constants";
import { createUserFormSchema } from "../model/schema";
import type { UserFormValues } from "../model/types";

interface Params {
  onClose: () => void;
  userToEdit?: UserRow | null;
}

const getDefaultValues = (userToEdit?: UserRow | null): UserFormValues => ({
  email: userToEdit?.email ?? "",
  firstName: userToEdit?.firstName ?? "",
  lastName: userToEdit?.lastName ?? "",
  role: userToEdit?.role ?? ROLE.ADMIN,
  companyId: userToEdit?.company?.id ?? null,
});

export const useUserForm = ({ onClose, userToEdit }: Params) => {
  const user = useAuthStore((state) => state.user);
  const isEditing = !!userToEdit;

  const schema = useMemo(
    () => createUserFormSchema(user?.role, isEditing),
    [user?.role, isEditing],
  );

  const defaultValues = useMemo(
    () => getDefaultValues(userToEdit),
    [userToEdit],
  );

  const { handleSubmit, reset, watch, control } = useForm<UserFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useFormReset(reset, defaultValues);

  const watchedRole = watch("role") as Role;

  const { data: companies, isLoading: isCompaniesLoading } = useQuery({
    queryKey: companiesKeys.list(false),
    queryFn: () => getCompanies(false),
    enabled: hasRoleSuperAdmin(user?.role),
  });

  const mutation = useToastMutation({
    mutationFn: (payload: CreateUserPayload) =>
      isEditing ? editUser(userToEdit!.id, payload) : createUser(payload),
    invalidateKeys: [usersKeys.all],
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

  const onSubmit = handleSubmit((values) => {
    mutation.mutate({
      ...(!isEditing && { email: values.email }),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      role: values.role as Role,
      ...(showCompanySelect ? { companyId: values.companyId! } : {}),
    });
  });

  return {
    control,
    onSubmit,
    isPending: mutation.isPending,
    isEditing,
    availableRoles,
    showCompanySelect,
    companies: companies as Company[] | undefined,
    isCompaniesLoading,
  };
};
