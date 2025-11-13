import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 hover:bg-gray-800 rounded-md transition-colors"
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}


