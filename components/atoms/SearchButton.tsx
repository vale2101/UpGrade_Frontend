interface SearchButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export default function SearchButton({ label, onClick, className = "" }: SearchButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900 ${className}`}
    >
      {label}
    </button>
  );
}
