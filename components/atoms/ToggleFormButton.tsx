"use client";

import { Plus, X } from "lucide-react";

interface ToggleFormButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  openLabel?: string;
  closeLabel?: string;
  className?: string;
}

export default function ToggleFormButton({
  isOpen,
  onToggle,
  openLabel = "Añadir",
  closeLabel = "Cancelar",
  className = ""
}: ToggleFormButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 text-sm font-medium text-black hover:text-gray-700 transition-colors ${className}`}
    >
      {isOpen ? (
        <>
          <X size={18} />
          {closeLabel}
        </>
      ) : (
        <>
          <Plus size={18} />
          {openLabel}
        </>
      )}
    </button>
  );
}

