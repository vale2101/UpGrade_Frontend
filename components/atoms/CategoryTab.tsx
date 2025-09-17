interface CategoryTabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function CategoryTab({ label, active = false, onClick }: CategoryTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-md font-semibold text-xs sm:text-sm border shadow-sm transition 
        ${active 
          ? "bg-black text-white" 
          : "bg-white text-black hover:bg-black hover:text-white"
        }`}
    >
      {label.toUpperCase()}
    </button>
  );
}
