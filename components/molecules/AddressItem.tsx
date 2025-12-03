"use client";

import { direccionInterface } from "../../interfaces/direccion.interface";
import AddressRadioButton from "../atoms/AddressRadioButton";

interface AddressItemProps {
  direccion: direccionInterface;
  isSelected: boolean;
  onSelect: (addressId: number) => void;
  className?: string;
}

export default function AddressItem({
  direccion,
  isSelected,
  onSelect,
  className = ""
}: AddressItemProps) {
  const handleClick = () => {
    if (direccion.id_direccion) {
      onSelect(direccion.id_direccion);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left p-4 border-2 rounded-lg transition-colors ${
        isSelected
          ? 'border-black bg-gray-50'
          : 'border-gray-200 hover:border-gray-300'
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <AddressRadioButton isSelected={isSelected} className="mt-1" />
        <div className="flex-1">
          <p className="font-medium text-gray-900">{direccion.completa}</p>
          <p className="text-sm text-gray-600 mt-1">
            {direccion.ciudad}, {direccion.departamento}, {direccion.pais}
          </p>
        </div>
      </div>
    </button>
  );
}

