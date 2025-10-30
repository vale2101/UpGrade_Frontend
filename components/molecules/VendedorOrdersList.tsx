"use client";

import { useVendedorOrders, VendedorOrder } from "../../hooks/useVendedorOrders";
import { Package, Calendar, User, CreditCard } from "lucide-react";

export default function VendedorOrdersList() {
  const { orders, updateOrderStatus, getStatusLabel } = useVendedorOrders();

  const getStatusColor = (status: VendedorOrder["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      shipped: "bg-purple-100 text-purple-800 border-purple-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status];
  };

  const handleStatusChange = (orderId: string, newStatus: VendedorOrder["status"]) => {
    updateOrderStatus(orderId, newStatus);
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg">No hay pedidos registrados</p>
        <p className="text-gray-400 text-sm mt-2">Los pedidos de tus clientes aparecerán aquí</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div 
          key={order.id} 
          className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Información del pedido */}
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

            {/* Estado del pedido */}
            <div className="flex flex-col items-start lg:items-end gap-3 lg:min-w-[200px]">
              <div className={`px-4 py-2 rounded-lg border font-medium text-sm ${getStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </div>
              
              <select 
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value as VendedorOrder["status"])}
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
      ))}
    </div>
  );
}

