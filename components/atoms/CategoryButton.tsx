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
      className={`px-4 py-2 rounded-full transition-colors ${
        isActive 
          ? "bg-black text-white" 
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      } ${className}`}
    >
      {children}
    </button>
  );
}
