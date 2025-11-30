"use client";

import { Package } from "lucide-react";
import { useAdministradorOrders } from "../../hooks/useAdministradorOrders";
import AdministradorOrderCard from "./AdministradorOrderCard";

export default function AdministradorOrdersList() {
  const { pedidos, loading, error, refetch } = useAdministradorOrders();

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-48 mx-auto mb-4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Package size={48} className="mx-auto text-red-400 mb-4" />
        <p className="text-red-600 text-lg mb-2">Error al cargar los pedidos</p>
        <p className="text-gray-400 text-sm">{error}</p>
      </div>
    );
  }

  if (pedidos.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg">No hay pedidos registrados</p>
        <p className="text-gray-400 text-sm mt-2">Los pedidos de todos los clientes aparecerán aquí</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pedidos.map((pedido) => (
        <AdministradorOrderCard 
          key={pedido.id_pedido} 
          pedido={pedido}
          onStatusUpdate={refetch}
        />
      ))}
    </div>
  );
}

