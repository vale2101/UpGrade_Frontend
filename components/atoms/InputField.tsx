interface InputFieldProps {
  type: string
  placeholder: string
}

export default function InputField({ type, placeholder }: InputFieldProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-red-500"
    />
  )
}