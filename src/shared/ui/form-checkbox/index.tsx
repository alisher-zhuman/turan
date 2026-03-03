import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";

import Checkbox, { type CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel, {
  type FormControlLabelProps,
} from "@mui/material/FormControlLabel";

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
