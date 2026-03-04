import { z } from "zod";

export const GroupFormSchema = z.object({
  name: z.string().trim().min(1, "Введите название группы"),
});
