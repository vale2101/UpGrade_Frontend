interface CarouselIndicatorProps {
  active: boolean;
  onClick: () => void;
  index: number;
}

export default function CarouselIndicator({ active, onClick, index }: CarouselIndicatorProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-2 h-2 sm:w-3 sm:h-3 rounded-full
        transition-all duration-300
        ${active 
          ? "bg-[#57ad63] w-8 sm:w-10 scale-110" 
          : "bg-gray-300 hover:bg-gray-400"
        }
        focus:outline-none focus:ring-2 focus:ring-[#57ad63] focus:ring-offset-2
      `}
      aria-label={`Ir a slide ${index + 1}`}
      aria-current={active ? "true" : "false"}
    />
  );
}

