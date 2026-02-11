import type { ChangeEvent } from "react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type Props<TFieldValues extends FieldValues> = Omit<
  TextFieldProps,
  "name" | "defaultValue" | "value" | "onChange" | "select"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  parseValue?: (value: string) => unknown;
};

export const FormSelect = <TFieldValues extends FieldValues>({
  name,
  control,
  helperText,
  parseValue,
  ...rest
}: Props<TFieldValues>) => {
  const { field, fieldState } = useController({ name, control });
  const errorMessage = fieldState.error?.message;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const nextValue = parseValue ? parseValue(rawValue) : rawValue;
    field.onChange(nextValue);
  };

  return (
    <TextField
      {...rest}
      select
      value={field.value ?? ""}
      name={field.name}
      onChange={handleChange}
      onBlur={field.onBlur}
      inputRef={field.ref}
      error={Boolean(errorMessage)}
      helperText={errorMessage ?? helperText}
    />
  );
};
