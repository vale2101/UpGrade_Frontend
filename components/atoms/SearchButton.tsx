import { Search } from "lucide-react";

interface SearchButtonProps {
  onClick: () => void;
}

export default function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label="Buscar"
    >
      <Search size={20} />
    </button>
  );
}
