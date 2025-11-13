import { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  className?: string;
  // Props legacy para compatibilidad
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
  const error = errors?.[name];
  const errorMessage = error?.message as string;

  // Si se usa react-hook-form
  if (register) {
    return (
      <div className={`mb-4 ${className}`}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          id={name}
          {...register(name, { required: required ? `${label} es requerido` : false })}
          placeholder={placeholder}
          className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-sm sm:text-base ${
            errorMessage 
              ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {errorMessage && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  }

  // Compatibilidad con formularios legacy
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
      />
    </div>
  );
}
