"use client";
import { useState, useEffect } from "react";
import { useAddressList } from "../../hooks/useAddressList";
import { direccionInterface } from "../../interfaces/direccion.interface";

interface CheckoutAddressSectionProps {
  selectedAddressId: number | null;
  onAddressSelect: (addressId: number) => void;
  className?: string;
}

export default function CheckoutAddressSection({ 
  selectedAddressId, 
  onAddressSelect,
  className = "" 
}: CheckoutAddressSectionProps) {
  const { direcciones, loading } = useAddressList();

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dirección de entrega</h3>
        <div className="space-y-2">
          <div className="h-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (direcciones.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dirección de entrega</h3>
        <p className="text-sm text-gray-600">No tienes direcciones guardadas. Por favor, agrega una dirección en tu perfil.</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Dirección de entrega</h3>
      <div className="space-y-3">
        {direcciones.map((direccion) => (
          <button
            key={direccion.id_direccion}
            onClick={() => direccion.id_direccion && onAddressSelect(direccion.id_direccion)}
            className={`w-full text-left p-4 border-2 rounded-lg transition-colors ${
              selectedAddressId === direccion.id_direccion
                ? 'border-black bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-1 ${
                selectedAddressId === direccion.id_direccion
                  ? 'border-black'
                  : 'border-gray-300'
              }`}>
                {selectedAddressId === direccion.id_direccion && (
                  <div className="w-2 h-2 bg-black rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{direccion.completa}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {direccion.ciudad}, {direccion.departamento}, {direccion.pais}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

