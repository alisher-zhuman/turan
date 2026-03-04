import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signIn } from "@/entities/authentication";

import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";
import { useAuthStore } from "@/shared/stores";

import { SignInFormSchema } from "../schemas";
import type { SignInFormValues } from "../types";

export const useSignInForm = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useToastMutation({
    mutationFn: ({ email, password }: SignInFormValues) =>
      signIn(email, password),
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
