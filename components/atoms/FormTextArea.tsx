import { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";

interface FormTextAreaProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  rows?: number;
  className?: string;
  // Props legacy para compatibilidad
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
  onChange
}: FormTextAreaProps<T>) {
  const error = errors?.[name];
  const errorMessage = error?.message as string;

  // Si se usa react-hook-form
  if (register) {
    return (
      <div className={`mb-4 ${className}`}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          id={name}
          {...register(name, { required: required ? `${label} es requerido` : false })}
          placeholder={placeholder}
          rows={rows}
          className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 resize-vertical text-sm sm:text-base ${
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
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical text-sm sm:text-base"
      />
    </div>
  );
}
