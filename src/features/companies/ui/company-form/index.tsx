import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import type {
  Company,
  CompanyPayload,
} from "@/features/companies/interfaces/companies";
import { createCompany, editCompany } from "../../api/companies";

interface Props {
  company?: Company | null;
  onClose: () => void;
}

export const CompanyForm = ({ company, onClose }: Props) => {
  const [name, setName] = useState(company?.name || "");
  const [address, setAddress] = useState(company?.address || "");
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const isEditing = !!company;

  const mutation = useMutation({
    mutationFn: (payload: CompanyPayload) =>
      isEditing ? editCompany(company!.id, payload) : createCompany(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      onClose();
      toast.success(
        isEditing ? "Компания успешно обновлена" : "Компания успешно создана"
      );
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      setErrorMessage(
        error.response?.data?.message || "Ошибка при сохранении компании"
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (name.trim().length < 3) {
      setErrorMessage("Название должно быть не менее 3 символов");
      return;
    }

    mutation.mutate({ name: name.trim(), address: address.trim() });
  };

  const buttonText = mutation.isPending
    ? isEditing
      ? "Обновление..."
      : "Создание..."
    : isEditing
    ? "Сохранить"
    : "Создать";

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <TextField
        label="Название компании"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />

      <TextField
        label="Адрес"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={mutation.isPending}
      >
        {buttonText}
      </Button>
    </Box>
  );
};
