"use client";
import { PedidoInterface } from "../../interfaces/pedido.interface";

interface OrderDetailSummaryProps {
  pedido: PedidoInterface;
  className?: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function OrderDetailSummary({ pedido, className = "" }: OrderDetailSummaryProps) {
  const subtotal = pedido.total || 0;
  const total = subtotal;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del pedido</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Envío</span>
          <span className="font-medium text-green-600">Gratis</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

