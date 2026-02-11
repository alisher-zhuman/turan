import Checkbox, { type CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel, {
  type FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type Props<TFieldValues extends FieldValues> = Omit<
  FormControlLabelProps,
  "control"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  checkboxProps?: CheckboxProps;
};

export const FormCheckbox = <TFieldValues extends FieldValues>({
  name,
  control,
  checkboxProps,
  ...rest
}: Props<TFieldValues>) => {
  const { field } = useController({ name, control });

  return (
    <FormControlLabel
      {...rest}
      control={
        <Checkbox
          {...checkboxProps}
          checked={Boolean(field.value)}
          onChange={(event) => field.onChange(event.target.checked)}
          inputRef={field.ref}
        />
      }
    />
  );
};
