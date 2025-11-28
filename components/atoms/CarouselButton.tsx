import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function CarouselButton({ 
  direction, 
  onClick, 
  disabled = false,
  className = "" 
}: CarouselButtonProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        absolute top-1/2 -translate-y-1/2 z-10
        ${direction === "prev" ? "left-2 sm:left-4" : "right-2 sm:right-4"}
        w-10 h-10 sm:w-12 sm:h-12
        bg-white/90 hover:bg-white
        rounded-full shadow-lg
        flex items-center justify-center
        transition-all duration-300
        hover:scale-110 active:scale-95
        disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
        group
        ${className}
      `}
      aria-label={direction === "prev" ? "Anterior" : "Siguiente"}
    >
      <Icon 
        size={20} 
        className="text-gray-800 group-hover:text-[#57ad63] transition-colors" 
      />
    </button>
  );
}

