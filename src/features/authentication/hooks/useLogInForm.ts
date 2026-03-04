import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { logIn } from "@/entities/authentication";

import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";
import { useAuthStore } from "@/shared/stores";

import { LogInFormSchema } from "../schemas";
import type { LogInFormValues } from "../types";

export const useLogInForm = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<LogInFormValues>({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useToastMutation({
    mutationFn: ({ email, password }: LogInFormValues) =>
      logIn(email, password),
    onSuccess: (data) => {
      const { accessToken, ...user } = data;

      setAuth({
        user,
        accessToken,
      });

      navigate("/");
    },
    errorMessage: (err: unknown) => getApiErrorMessage(err, "Ошибка входа"),
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
