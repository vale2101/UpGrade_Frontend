"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import { ProductFormData } from "../../hooks/useAdministradorProductForm";
import InputField from "../atoms/InputField";

interface ProductFormNumberFieldProps {
  label: string;
  name: keyof ProductFormData;
  placeholder: string;
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  min?: number;
  validationRules?: {
    required?: string;
    min?: { value: number; message: string };
  };
}

export default function ProductFormNumberField({
  label,
  name,
  placeholder,
  control,
  errors,
  min = 0,
  validationRules,
}: ProductFormNumberFieldProps) {
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={validationRules || {
          required: `${label} es requerido`,
          min: { value: min, message: `${label} debe ser mayor o igual a ${min}` },
        }}
        render={({ field }) => (
          <>
            <InputField
              type="number"
              name={field.name}
              value={String(field.value ?? "")}
              onChange={(e) => field.onChange(Number(e.target.value) || min)}
              onBlur={field.onBlur}
              placeholder={placeholder}
              required
            />
            {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
          </>
        )}
      />
    </div>
  );
}

