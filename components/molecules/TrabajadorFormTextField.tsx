"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TrabajadorFormData } from "./AdministradorTrabajadorForm";
import FormInput from "../atoms/FormInput";

interface TrabajadorFormTextFieldProps {
  label: string;
  name: keyof TrabajadorFormData;
  type?: string;
  placeholder: string;
  register: UseFormRegister<TrabajadorFormData>;
  errors: FieldErrors<TrabajadorFormData>;
  required?: boolean;
  validationRules?: {
    required?: string | boolean;
    minLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  };
}

export default function TrabajadorFormTextField({
  label,
  name,
  type = "text",
  placeholder,
  register,
  errors,
  required = false,
  validationRules,
}: TrabajadorFormTextFieldProps) {
  return (
    <FormInput<TrabajadorFormData>
      label={label}
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      register={register(name, validationRules as any)}
      errors={errors}
    />
  );
}

