"use client";

import { useMemo } from "react";
import { direccionInterface } from "../../interfaces/direccion.interface";
import AddressItem from "./AddressItem";

interface CheckoutAddressListProps {
  direcciones: direccionInterface[];
  selectedAddressId: number | null;
  onAddressSelect: (addressId: number) => void;
  emptyMessage?: string;
  className?: string;
}

export default function CheckoutAddressList({
  direcciones,
  selectedAddressId,
  onAddressSelect,
  emptyMessage = "No tienes direcciones guardadas.",
  className = ""
}: CheckoutAddressListProps) {  
  const listKey = useMemo(() => {
    if (direcciones.length === 0) return "empty";
    const ids = direcciones.map(d => d.id_direccion || "").filter(Boolean).join('-');
    const count = direcciones.length;
    return `${ids}-count:${count}`;
  }, [direcciones]);

  if (direcciones.length === 0) {
    return (
      <p className={`text-sm text-gray-600 ${className}`}>
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className={`space-y-3 ${className}`} key={listKey}>
      {direcciones.map((direccion) => (
        <AddressItem
          key={direccion.id_direccion || `address-${direccion.completa}`}
          direccion={direccion}
          isSelected={selectedAddressId === direccion.id_direccion}
          onSelect={onAddressSelect}
        />
      ))}
    </div>
  );
}

