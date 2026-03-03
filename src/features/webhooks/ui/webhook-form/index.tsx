import Box from "@mui/material/Box";

import { FormActions } from "@/shared/ui/form-actions";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { FormTextField } from "@/shared/ui/form-text-field";

import { useWebhookForm } from "../../hooks/useWebhookForm";

interface Props {
  onClose: () => void;
}

export const WebhookForm = ({ onClose }: Props) => {
  const { control, onSubmit, isPending } = useWebhookForm({ onClose });

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <FormFieldset disabled={isPending}>
        <FormTextField
          label="URL вебхука"
          fullWidth
          name="url"
          control={control}
        />
      </FormFieldset>

      <FormActions isSubmitting={isPending} submitLabel="Создать" />
    </Box>
  );
};
