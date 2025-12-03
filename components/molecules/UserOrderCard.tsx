"use client";
import { useRouter } from "next/navigation";
import { Calendar, Package } from "lucide-react";
import { PedidoInterface } from "../../interfaces/pedido.interface";
import UserOrderStatusBadge from "./UserOrderStatusBadge";

interface UserOrderCardProps {
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

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Fecha no disponible';
  try {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

export default function UserOrderCard({ pedido, className = "" }: UserOrderCardProps) {
  const router = useRouter();
  
  let productos: any[] = [];
  
  if (Array.isArray(pedido.productos)) {
    productos = pedido.productos;
  } else if (pedido.productos && typeof pedido.productos === 'string') {
    try {
      const parsed = JSON.parse(pedido.productos);
      productos = Array.isArray(parsed) ? parsed : [];
    } catch {
      productos = [];
    }
  } else if (pedido.productos && typeof pedido.productos === 'object') {
    productos = [pedido.productos];
  }
  
  const totalItems = productos.reduce((sum, producto) => sum + (producto?.cantidad || 0), 0);
  const total = pedido.total || 0;

  const handleClick = () => {
    if (pedido.id_pedido) {
      router.push(`/user/pedido/${pedido.id_pedido}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Pedido #{pedido.id_pedido || 'N/A'}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <Calendar size={14} />
                <span>{formatDate(pedido.fecha)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Package size={16} className="text-gray-400" />
              <span className="text-gray-600">
                <strong className="text-gray-900">{totalItems}</strong> {totalItems === 1 ? 'producto' : 'productos'}
              </span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="font-semibold text-lg text-gray-900">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-3 lg:min-w-[150px]">
          {pedido.estado && (
            <UserOrderStatusBadge estado={pedido.estado} />
          )}
        </div>
      </div>
    </div>
  );
}

