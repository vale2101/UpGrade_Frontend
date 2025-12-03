import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface FormTextAreaProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  rows?: number;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function FormTextArea<T extends FieldValues>({
  label,
  name,
  placeholder,
  required = false,
  register,
  errors,
  rows = 4,
  className = "",
  value,
  onChange,
}: FormTextAreaProps<T>) {
  const errorMessage = errors?.[name]?.message as string | undefined;
  const hasError = !!errorMessage;


  const textareaProps =
    register && !onChange
      ? register(name, { required })
      : { name, value, onChange, required };

  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 resize-vertical text-sm sm:text-base ${
          hasError
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        }`}
        {...textareaProps}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
