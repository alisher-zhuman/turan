import TextField, { type TextFieldProps } from "@mui/material/TextField";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type Props<TFieldValues extends FieldValues> = Omit<
  TextFieldProps,
  "name" | "defaultValue" | "value" | "onChange"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export const FormTextField = <TFieldValues extends FieldValues>({
  name,
  control,
  helperText,
  ...rest
}: Props<TFieldValues>) => {
  const { field, fieldState } = useController({ name, control });
  const errorMessage = fieldState.error?.message;

  return (
    <TextField
      {...rest}
      {...field}
      value={field.value ?? ""}
      error={Boolean(errorMessage)}
      helperText={errorMessage ?? helperText}
    />
  );
};
