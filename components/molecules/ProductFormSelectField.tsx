"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import { ProductFormData } from "../../hooks/useAdministradorProductForm";

interface ProductFormSelectFieldProps {
  label: string;
  name: keyof ProductFormData;
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  options: { value: string; label: string }[];
}

export default function ProductFormSelectField({
  label,
  name,
  control,
  errors,
  options,
}: ProductFormSelectFieldProps) {
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} es requerido` }}
        render={({ field }) => (
          <>
            <select
              {...field}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#57ad63] outline-none ${
                errorMessage ? "border-red-500" : "border-gray-300"
              }`}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
          </>
        )}
      />
    </div>
  );
}

