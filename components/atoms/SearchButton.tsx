interface SearchButtonProps {
  label: string;
  onClick: () => void;
}

export default function SearchButton({ label, onClick }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base text-gray-800 hover:bg-gray-100 hover:text-black transition-colors duration-200 font-medium"
      aria-label={`Buscar ${label}`}
    >
      {label}
    </button>
  );
}
