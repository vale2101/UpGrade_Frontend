import Link from "next/link";
import { ReactNode } from "react";

interface DropdownMenuItemProps {
  href?: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

export default function DropdownMenuItem({ 
  href, 
  icon, 
  label, 
  onClick,
  variant = "default" 
}: DropdownMenuItemProps) {
  const baseClasses = "flex items-center px-4 py-2 text-sm transition-colors";
  const variantClasses = variant === "danger" 
    ? "text-red-600 hover:bg-red-50" 
    : "text-gray-700 hover:bg-gray-100";
  
  const className = `${baseClasses} ${variantClasses}`;

  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        <span className="mr-3">{icon}</span>
        {label}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${className} w-full text-left`}>
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );
}

