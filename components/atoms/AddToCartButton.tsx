"use client";

interface AddToCartButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function AddToCartButton({ onClick, className = "" }: AddToCartButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all ${className}`}
    >
      +
    </button>
  );
}
