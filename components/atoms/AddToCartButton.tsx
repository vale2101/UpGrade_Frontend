"use client";

interface AddToCartButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function AddToCartButton({ onClick, className = "" }: AddToCartButtonProps) {
  return (
    <button
      onClick={onClick}
      data-add-to-cart
      className={`absolute top-2 right-2 w-8 h-8 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-all z-10 ${className}`}
    >
      +
    </button>
  );
}
