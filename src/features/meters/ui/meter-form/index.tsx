// src/features/meters/ui/meter-form.tsx
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import type { Meter } from "../../interfaces";
import { updateMeter } from "../../api";

interface Props {
  meterToEdit: Meter | null;
  onClose: () => void;
  canArchive: boolean;
}

export const MeterForm = ({ meterToEdit, onClose, canArchive }: Props) => {
  const [customerID, setCustomerID] = useState<number | null>(null);
  const [client, setClient] = useState("");
  const [address, setAddress] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [isArchived, setIsArchived] = useState(false);

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (meterToEdit) {
      setCustomerID(
        meterToEdit.customerID !== null ? +meterToEdit.customerID : null
      );
      setClient(meterToEdit.client ?? "");
      setAddress(meterToEdit.address ?? "");
      setDescriptions(meterToEdit.descriptions ?? "");
      setIsArchived(meterToEdit.isArchived);
    } else {
      setCustomerID(null);
      setClient("");
      setAddress("");
      setDescriptions("");
      setIsArchived(false);
    }
  }, [meterToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!meterToEdit) return;

    try {
      setLoading(true);

      await updateMeter({
        meterId: meterToEdit.id,
        customerID,
        client,
        address,
        descriptions,
        isArchived: canArchive ? isArchived : meterToEdit.isArchived,
      });

      toast.success("Счётчик обновлён");
      await queryClient.invalidateQueries({ queryKey: ["meters"] });
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при сохранении счётчика"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TextField
        label="ID Клиента"
        type="number"
        value={customerID}
        onChange={(e) => setCustomerID(+e.target.value)}
      />

      <TextField
        label="Клиент"
        value={client}
        onChange={(e) => setClient(e.target.value)}
      />

      <TextField
        label="Адрес"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <TextField
        label="Описание"
        value={descriptions}
        onChange={(e) => setDescriptions(e.target.value)}
        multiline
        minRows={2}
      />

      {canArchive && (
        <FormControlLabel
          control={
            <Checkbox
              checked={isArchived}
              onChange={(e) => setIsArchived(e.target.checked)}
            />
          }
          label="Отправить в архив"
        />
      )}

      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button type="submit" variant="contained" disabled={loading}>
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};
