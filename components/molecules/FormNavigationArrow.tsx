"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";

interface FormNavigationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
  className?: string;
}

export default function FormNavigationArrow({
  direction,
  onClick,
  label,
  className = "",
}: FormNavigationArrowProps) {
  const Icon = direction === "right" ? ChevronRight : ChevronLeft;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#57ad63] hover:text-[#459a52] transition-colors ${className}`}
      aria-label={label}
    >
      {direction === "left" && <Icon size={20} />}
      <span>{label}</span>
      {direction === "right" && <Icon size={20} />}
    </button>
  );
}

