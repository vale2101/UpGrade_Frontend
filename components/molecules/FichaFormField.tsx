"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FichaFormData } from "../../hooks/useFichaForm";
import InputField from "../atoms/InputField";

interface FichaFormFieldProps {
  label: string;
  name: keyof FichaFormData;
  placeholder: string;
  register: UseFormRegister<FichaFormData>;
  errors: FieldErrors<FichaFormData>;
  required?: boolean;
  validationRules?: {
    required?: string | { value: boolean; message: string };
    minLength?: { value: number; message: string };
  };
}

export default function FichaFormField({
  label,
  name,
  placeholder,
  register,
  errors,
  required = true,
  validationRules,
}: FichaFormFieldProps) {
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <InputField
        {...register(name, validationRules || { required: required ? `${label} es requerido` : false })}
        placeholder={placeholder}
        required={required}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}

