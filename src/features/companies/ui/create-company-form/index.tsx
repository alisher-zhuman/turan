import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { createCompany } from "@/shared/api/companies";

interface CreateCompanyFormProps {
  onClose: () => void;
}

export const CreateCompanyForm = ({ onClose }: CreateCompanyFormProps) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const createCompanyMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      onClose();
    },
    onError: (error: any) => {
      setErrorMessage(
        error.response?.data?.message || "Ошибка при создании компании"
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    createCompanyMutation.mutate({ name, address });
  };

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
        disabled={createCompanyMutation.isPending}
      >
        {createCompanyMutation.isPending ? "Создание..." : "Создать"}
      </Button>
    </Box>
  );
};
