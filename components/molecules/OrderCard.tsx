import { Calendar, User, CreditCard } from "lucide-react";
import { VendedorOrder } from "../../hooks/useVendedorOrders";
import OrderStatusBadge from "../atoms/OrderStatusBadge";

interface OrderCardProps {
  order: VendedorOrder;
  statusLabel: string;
  onStatusChange: (orderId: string, newStatus: VendedorOrder["status"]) => void;
}

export default function OrderCard({ order, statusLabel, onStatusChange }: OrderCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Pedido #{order.orderNumber}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <Calendar size={14} />
                <span>{new Date(order.date).toLocaleDateString('es-ES', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <User size={16} className="text-gray-400" />
              <div>
                <span className="font-medium">{order.customer}</span>
                <p className="text-xs text-gray-500">{order.customerEmail}</p>
              </div>
            </div>
            
            {order.paymentMethod && (
              <div className="flex items-center gap-2 text-gray-700">
                <CreditCard size={16} className="text-gray-400" />
                <span>{order.paymentMethod}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">
              <strong className="text-gray-900">{order.items}</strong> {order.items === 1 ? 'producto' : 'productos'}
            </span>
            <span className="text-gray-400">•</span>
            <span className="font-semibold text-lg text-gray-900">
              {order.total}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-3 lg:min-w-[200px]">
          <OrderStatusBadge status={order.status} label={statusLabel} />
          
          <select 
            value={order.status}
            onChange={(e) => onStatusChange(order.id, e.target.value as VendedorOrder["status"])}
            className="w-full lg:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#57ad63] focus:border-[#57ad63] outline-none bg-white"
          >
            <option value="pending">Pendiente</option>
            <option value="processing">En proceso</option>
            <option value="shipped">Enviado</option>
            <option value="delivered">Entregado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
      </div>
    </div>
  );
}


