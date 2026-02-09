import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { createGroup, updateGroup, type Group } from "@/entities/groups";

interface Props {
  groupToEdit: Group | null;
  onClose: () => void;
}

export const GroupForm = ({ groupToEdit, onClose }: Props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (groupToEdit) {
      setName(groupToEdit.name);
    } else {
      setName("");
    }
  }, [groupToEdit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Введите название группы");
      return;
    }

    try {
      setLoading(true);

      if (groupToEdit) {
        await updateGroup(groupToEdit.id, name.trim());
        toast.success("Группа обновлена");
      } else {
        await createGroup(name.trim());
        toast.success("Группа создана");
      }

      await queryClient.invalidateQueries({ queryKey: ["groups"] });
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при сохранении группы",
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
        label="Название группы"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />

      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button type="submit" variant="contained" disabled={loading}>
          {groupToEdit ? "Сохранить" : "Создать"}
        </Button>
      </Box>
    </Box>
  );
};
