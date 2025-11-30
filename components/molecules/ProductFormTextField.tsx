"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProductFormData } from "../../hooks/useAdministradorProductForm";
import InputField from "../atoms/InputField";

interface ProductFormTextFieldProps {
  label: string;
  name: keyof ProductFormData;
  placeholder: string;
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  validationRules?: {
    required?: string | { value: boolean; message: string };
    minLength?: { value: number; message: string };
  };
}

export default function ProductFormTextField({
  label,
  name,
  placeholder,
  register,
  errors,
  validationRules,
}: ProductFormTextFieldProps) {
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <InputField
        {...register(name, validationRules || { required: `${label} es requerido` })}
        placeholder={placeholder}
        required
      />
      {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
}

