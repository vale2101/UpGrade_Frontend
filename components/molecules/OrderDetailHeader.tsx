"use client";
import { Calendar } from "lucide-react";
import { PedidoInterface } from "../../interfaces/pedido.interface";
import UserOrderStatusBadge from "./UserOrderStatusBadge";

interface OrderDetailHeaderProps {
  pedido: PedidoInterface;
  className?: string;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Fecha no disponible';
  try {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
};

export default function OrderDetailHeader({ pedido, className = "" }: OrderDetailHeaderProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Pedido #{pedido.id_pedido || 'N/A'}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>{formatDate(pedido.fecha)}</span>
          </div>
        </div>
        {pedido.estado && (
          <div>
            <UserOrderStatusBadge estado={pedido.estado} className="text-sm px-4 py-2" />
          </div>
        )}
      </div>
    </div>
  );
}

