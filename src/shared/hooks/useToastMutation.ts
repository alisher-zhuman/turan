import type { MutationFunctionContext } from "@tanstack/query-core";
import {
  type MutationFunction,
  type QueryKey,
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

type SuccessMessage<TData, TVariables, TOnMutateResult> =
  | string
  | ((
      data: TData,
      variables: TVariables,
      onMutateResult: TOnMutateResult | undefined,
      context: MutationFunctionContext,
    ) => string | null | undefined);

type ErrorMessage<TError, TVariables, TOnMutateResult> =
  | string
  | ((
      error: TError,
      variables: TVariables,
      onMutateResult: TOnMutateResult | undefined,
      context: MutationFunctionContext,
    ) => string | null | undefined);

type ToastMutationOptions<TData, TError, TVariables, TOnMutateResult> = Omit<
  UseMutationOptions<TData, TError, TVariables, TOnMutateResult>,
  "mutationFn" | "onSuccess" | "onError"
> & {
  mutationFn: MutationFunction<TData, TVariables>;
  invalidateKeys?: QueryKey[];
  successMessage?: SuccessMessage<TData, TVariables, TOnMutateResult>;
  errorMessage?: ErrorMessage<TError, TVariables, TOnMutateResult>;
  onSuccess?: UseMutationOptions<
    TData,
    TError,
    TVariables,
    TOnMutateResult
  >["onSuccess"];
  onError?: UseMutationOptions<
    TData,
    TError,
    TVariables,
    TOnMutateResult
  >["onError"];
};

const resolveMessage = <TData, TVariables, TOnMutateResult>(
  message: SuccessMessage<TData, TVariables, TOnMutateResult> | undefined,
  data: TData,
  variables: TVariables,
  onMutateResult: TOnMutateResult | undefined,
  context: MutationFunctionContext,
) => {
  if (!message) return null;
  return typeof message === "function"
    ? message(data, variables, onMutateResult, context)
    : message;
};

const resolveErrorMessage = <TError, TVariables, TOnMutateResult>(
  message: ErrorMessage<TError, TVariables, TOnMutateResult> | undefined,
  error: TError,
  variables: TVariables,
  onMutateResult: TOnMutateResult | undefined,
  context: MutationFunctionContext,
) => {
  if (!message) return null;
  return typeof message === "function"
    ? message(error, variables, onMutateResult, context)
    : message;
};

export const useToastMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TOnMutateResult = unknown,
>(
  options: ToastMutationOptions<TData, TError, TVariables, TOnMutateResult>,
): UseMutationResult<TData, TError, TVariables, TOnMutateResult> => {
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

  return useMutation<TData, TError, TVariables, TOnMutateResult>({
    mutationFn,
    ...rest,
    onSuccess: (data, variables, onMutateResult, context) => {
      if (invalidateKeys?.length) {
        invalidateKeys.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }

      const message = resolveMessage(
        successMessage,
        data,
        variables,
        onMutateResult,
        context,
      );

      if (message) {
        toast.success(message);
      }

      onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      const message = resolveErrorMessage(
        errorMessage,
        error,
        variables,
        onMutateResult,
        context,
      );

      if (message) {
        toast.error(message);
      }

      onError?.(error, variables, onMutateResult, context);
    },
  });
};
