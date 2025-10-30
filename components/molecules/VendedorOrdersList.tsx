"use client";

import { Package } from "lucide-react";
import { useVendedorOrders } from "../../hooks/useVendedorOrders";
import OrderCard from "./OrderCard";

export default function VendedorOrdersList() {
  const { orders, updateOrderStatus, getStatusLabel } = useVendedorOrders();

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
        <OrderCard
          key={order.id}
          order={order}
          statusLabel={getStatusLabel(order.status)}
          onStatusChange={updateOrderStatus}
        />
      ))}
    </div>
  );
}
