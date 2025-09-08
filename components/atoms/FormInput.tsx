interface FormInputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function FormInput({ 
  label, 
  type, 
  name, 
  placeholder, 
  required = false, 
  value, 
  onChange,
  className = "" 
}: FormInputProps) {
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
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
