"use client";
import { MapPin } from "lucide-react";
import { useAddress } from "../../hooks/useAddress";

interface OrderDetailAddressProps {
  addressId: number;
  className?: string;
}

export default function OrderDetailAddress({ addressId, className = "" }: OrderDetailAddressProps) {
  const { direccion, loading, error } = useAddress(addressId);

  console.log("OrderDetailAddress - addressId:", addressId);
  console.log("OrderDetailAddress - loading:", loading);
  console.log("OrderDetailAddress - error:", error);
  console.log("OrderDetailAddress - direccion:", direccion);

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin size={20} />
          Dirección de entrega
        </h3>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !direccion) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin size={20} />
          Dirección de entrega
        </h3>
        <p className="text-sm text-gray-600">
          {error || "Dirección no disponible"}
        </p>
        {error && (
          <p className="text-xs text-red-500 mt-2">
            ID de dirección: {addressId}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MapPin size={20} />
        Dirección de entrega
      </h3>
      <div className="space-y-1 text-gray-700">
        <p className="font-medium">{direccion.completa}</p>
        <p className="text-sm text-gray-600">
          {direccion.ciudad}, {direccion.departamento}
        </p>
        <p className="text-sm text-gray-600">{direccion.pais}</p>
      </div>
    </div>
  );
}

