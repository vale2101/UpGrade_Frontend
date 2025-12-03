import { FieldErrors, FieldValues, Path } from "react-hook-form";
import React from "react";

type RegisterType = any;

interface FormInputProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  placeholder?: string;
  required?: boolean;
  register?: RegisterType; 
  errors?: FieldErrors<T>;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput<T extends FieldValues>({ 
  label, 
  type, 
  name, 
  placeholder, 
  required = false, 
  register,
  errors,
  className = "",
  value,
  onChange
}: FormInputProps<T>) {
  const errorMessage = errors?.[name]?.message as string;
  const hasError = !!errorMessage;
  const inputProps = register && !onChange ? register : { name, value, onChange, required };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-sm sm:text-base ${
          hasError 
            ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        }`}
        {...inputProps}
      />
      {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
}
