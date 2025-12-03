"use client";

import { direccionInterface } from "../../interfaces/direccion.interface";
import InfoLabel from "../atoms/InfoLabel";
import InfoValue from "../atoms/InfoValue";

interface OrderConfirmationAddressCardProps {
  address: direccionInterface;
  className?: string;
}

export default function OrderConfirmationAddressCard({
  address,
  className = ""
}: OrderConfirmationAddressCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Dirección de entrega</h3>
      <div className="space-y-2">
        <div>
          <InfoLabel>País</InfoLabel>
          <InfoValue className="block mt-1">{address.pais}</InfoValue>
        </div>
        <div>
          <InfoLabel>Departamento</InfoLabel>
          <InfoValue className="block mt-1">{address.departamento}</InfoValue>
        </div>
        <div>
          <InfoLabel>Ciudad</InfoLabel>
          <InfoValue className="block mt-1">{address.ciudad}</InfoValue>
        </div>
        <div>
          <InfoLabel>Dirección completa</InfoLabel>
          <InfoValue className="block mt-1">{address.completa}</InfoValue>
        </div>
      </div>
    </div>
  );
}

