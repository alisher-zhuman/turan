import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { signIn } from "@/entities/authentication";
import { useAuthStore } from "@/shared/stores";
import { useToastMutation } from "@/shared/hooks";
import { getApiErrorMessage } from "@/shared/helpers";
import { SignInFormSchema } from "../model/schema";
import type { SignInFormValues } from "../model/types";

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
