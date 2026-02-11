import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendForgotRequest } from "@/entities/authentication";
import { useToastMutation } from "@/shared/hooks";
import { getApiErrorMessage } from "@/shared/helpers";
import { ForgotFormSchema } from "../model/schema";
import type { ForgotFormValues } from "../model/types";

export const useForgotForm = () => {
  const { handleSubmit, control } = useForm<ForgotFormValues>({
    resolver: zodResolver(ForgotFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useToastMutation({
    mutationFn: ({ email }: ForgotFormValues) => sendForgotRequest(email),
    successMessage: "Инструкция для восстановления отправлена на почту.",
    errorMessage: (err: unknown) =>
      getApiErrorMessage(err, "Ошибка при восстановлении"),
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    control,
    onSubmit,
    isPending: mutation.isPending,
  };
};
