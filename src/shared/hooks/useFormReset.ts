import { useEffect, type DependencyList } from "react";
import type { FieldValues, UseFormReset } from "react-hook-form";

export const useFormReset = <T extends FieldValues>(
  reset: UseFormReset<T>,
  values: T,
  deps: DependencyList = [],
) => {
  useEffect(() => {
    reset(values);
  }, [reset, values, ...deps]);
};
