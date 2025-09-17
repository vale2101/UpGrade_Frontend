import React from 'react';

interface CategoryButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function CategoryButton({ 
  children, 
  isActive = false, 
  onClick,
  className = ""
}: CategoryButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors text-xs sm:text-sm ${
        isActive 
          ? "bg-black text-white" 
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      } ${className}`}
    >
      {children}
    </button>
  );
}
