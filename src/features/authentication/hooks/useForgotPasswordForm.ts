import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { sendForgotPasswordRequest } from "@/entities/authentication";

import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

import { ForgotPasswordFormSchema } from "../schemas";
import type { ForgotPasswordFormValues } from "../types";

export const useForgotPasswordForm = () => {
  const { handleSubmit, control } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useToastMutation({
    mutationFn: ({ email }: ForgotPasswordFormValues) =>
      sendForgotPasswordRequest(email),
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
