import {
  useMutation,
  useQueryClient,
  type MutationFunction,
  type QueryKey,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

type SuccessMessage<TData, TVariables, TContext> =
  | string
  | ((
      data: TData,
      variables: TVariables,
      context: TContext | undefined,
    ) => string | null | undefined);

type ErrorMessage<TError, TVariables, TContext> =
  | string
  | ((
      error: TError,
      variables: TVariables,
      context: TContext | undefined,
    ) => string | null | undefined);

type ToastMutationOptions<TData, TError, TVariables, TContext> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  "mutationFn" | "onSuccess" | "onError"
> & {
  mutationFn: MutationFunction<TData, TVariables>;
  invalidateKeys?: QueryKey[];
  successMessage?: SuccessMessage<TData, TVariables, TContext>;
  errorMessage?: ErrorMessage<TError, TVariables, TContext>;
  onSuccess?: UseMutationOptions<
    TData,
    TError,
    TVariables,
    TContext
  >["onSuccess"];
  onError?: UseMutationOptions<TData, TError, TVariables, TContext>["onError"];
};

const resolveMessage = <TData, TVariables, TContext>(
  message: SuccessMessage<TData, TVariables, TContext> | undefined,
  data: TData,
  variables: TVariables,
  context: TContext | undefined,
) => {
  if (!message) return null;
  return typeof message === "function"
    ? message(data, variables, context)
    : message;
};

const resolveErrorMessage = <TError, TVariables, TContext>(
  message: ErrorMessage<TError, TVariables, TContext> | undefined,
  error: TError,
  variables: TVariables,
  context: TContext | undefined,
) => {
  if (!message) return null;
  return typeof message === "function"
    ? message(error, variables, context)
    : message;
};

export const useToastMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  options: ToastMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const queryClient = useQueryClient();

  const {
    mutationFn,
    invalidateKeys,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
    ...rest
  } = options;

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...rest,
    onSuccess: (data, variables, context) => {
      if (invalidateKeys?.length) {
        invalidateKeys.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }

      const message = resolveMessage(successMessage, data, variables, context);
      if (message) toast.success(message);

      onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      const message = resolveErrorMessage(
        errorMessage,
        error,
        variables,
        context,
      );
      if (message) toast.error(message);

      onError?.(error, variables, context);
    },
  });
};
