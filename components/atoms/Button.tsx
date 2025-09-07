interface ButtonProps {
  label: string
}

export default function Button({ label }: ButtonProps) {
  return (
    <button
      className="w-full text-white py-2 rounded-full transition"
      style={{ backgroundColor: "#57ad63" }}
    >
      {label}
    </button>
  )
}