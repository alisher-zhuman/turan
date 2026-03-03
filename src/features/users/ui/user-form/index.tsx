import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

import { type UserRow } from "@/entities/users";

import { ROLE_LABELS } from "@/shared/constants";
import { FormActions } from "@/shared/ui/form-actions";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { FormSelect } from "@/shared/ui/form-select";
import { FormTextField } from "@/shared/ui/form-text-field";

import { useUserForm } from "../../hooks/useUserForm";

interface Props {
  onClose: () => void;
  userToEdit?: UserRow | null;
}

export const UserForm = ({ onClose, userToEdit }: Props) => {
  const {
    control,
    onSubmit,
    isPending,
    isEditing,
    availableRoles,
    showCompanySelect,
    companies,
    isCompaniesLoading,
  } = useUserForm({ onClose, userToEdit });

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <FormFieldset disabled={isPending}>
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
            disabled={isCompaniesLoading || isPending}
            parseValue={(value) => (value ? Number(value) : null)}
          >
            {companies?.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </FormSelect>
        )}
      </FormFieldset>

      <FormActions
        isSubmitting={isPending}
        submitLabel={isEditing ? "Сохранить" : "Создать"}
        submitLabelLoading={isEditing ? "Обновление..." : "Создание..."}
      />
    </Box>
  );
};
