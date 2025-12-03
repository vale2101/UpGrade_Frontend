"use client";

interface AddressRadioButtonProps {
  isSelected: boolean;
  className?: string;
}

export default function AddressRadioButton({ isSelected, className = "" }: AddressRadioButtonProps) {
  return (
    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${className} ${
      isSelected ? 'border-black' : 'border-gray-300'
    }`}>
      {isSelected && (
        <div className="w-2 h-2 bg-black rounded-full" />
      )}
    </div>
  );
}

