"use client";
import { Package } from "lucide-react";
import { PedidoProducto } from "../../interfaces/pedido.interface";
import OrderDetailProductItem from "./OrderDetailProductItem";

interface OrderDetailProductsListProps {
  productos: PedidoProducto[];
  className?: string;
}

export default function OrderDetailProductsList({ productos, className = "" }: OrderDetailProductsListProps) {
  if (productos.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Package size={20} />
          Productos
        </h3>
        <p className="text-sm text-gray-600">No hay productos en este pedido</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Package size={20} />
        Productos ({productos.length})
      </h3>
      <div className="space-y-0">
        {productos.map((producto, index) => (
          <OrderDetailProductItem 
            key={`${producto.id_producto}-${index}`} 
            producto={producto} 
          />
        ))}
      </div>
    </div>
  );
}

