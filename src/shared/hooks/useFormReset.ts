import { useEffect } from "react";
import type { FieldValues, UseFormReset } from "react-hook-form";

export const useFormReset = <T extends FieldValues>(
  reset: UseFormReset<T>,
  values: T,
) => {
  useEffect(() => {
    reset(values);
  }, [reset, values]);
};
