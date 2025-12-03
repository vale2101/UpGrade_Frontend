interface EditableStockInputProps {
  value: number;
  onChange: (value: number) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

export default function EditableStockInput({
  value,
  onChange,
  onBlur,
  onKeyDown,
  disabled = false,
  className = ""
}: EditableStockInputProps) {
  return (
    <input
      type="number"
      min="0"
      value={value}
      onChange={(e) => {
        const newStock = parseInt(e.target.value) || 0;
        onChange(newStock);
      }}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      className={`w-20 px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#57ad63] focus:border-transparent ${className}`}
      disabled={disabled}
    />
  );
}

