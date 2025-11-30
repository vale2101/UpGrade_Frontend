"use client";

import { Pencil, Trash2 } from "lucide-react";
import { productoInterface } from "../../interfaces/producto.interface";

interface AdministradorProductsTableProps {
  products: productoInterface[];
  onEdit: (product: productoInterface) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const formatPrice = (price: number | string) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
};

export default function AdministradorProductsTable({ 
  products, 
  onEdit, 
  onDelete,
  loading = false 
}: AdministradorProductsTableProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-48 mx-auto mb-4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mx-auto" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No hay productos registrados
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full min-w-[640px]">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Categoría</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Tipo</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Capacidad</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {products.map(product => (
            <tr key={product.id_producto} className="hover:bg-gray-50">
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">{product.nombre}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{formatPrice(product.precio)}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{product.stock}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hidden sm:table-cell">{product.categoria}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm hidden md:table-cell">
                <span className="px-2 py-1 rounded-full text-xs bg-gray-100">{product.tipo}</span>
              </td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hidden lg:table-cell">{product.capacidad}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right">
                <div className="flex items-center justify-end gap-2">
                  <button 
                    onClick={() => onEdit(product)}
                    className="text-[#57ad63] hover:text-[#459a52] p-1"
                    aria-label="Editar"
                  >
                    <Pencil size={14} className="sm:w-4 sm:h-4" />
                  </button>
                  <button 
                    onClick={() => product.id_producto && onDelete(product.id_producto)}
                    className="text-red-600 hover:text-red-700 p-1"
                    aria-label="Eliminar"
                  >
                    <Trash2 size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

