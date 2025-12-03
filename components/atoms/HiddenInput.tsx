"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface HiddenInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  value: string | number;
}

export default function HiddenInput<TFieldValues extends FieldValues>({
  name,
  control,
  value,
}: HiddenInputProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value as TFieldValues[typeof name]}
      rules={{ required: true }}
      render={({ field }) => {
        if (value && field.value !== value) {
          field.onChange(value);
        }
        return <input type="hidden" {...field} value={value || field.value} />;
      }}
    />
  );
}

