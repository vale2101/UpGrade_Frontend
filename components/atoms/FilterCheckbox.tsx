interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export default function FilterCheckbox({ label, checked, onChange }: FilterCheckboxProps) {
  return (
    <label className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
      <input 
        type="checkbox" 
        className="mr-2 cursor-pointer" 
        checked={checked}
        onChange={onChange}
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

