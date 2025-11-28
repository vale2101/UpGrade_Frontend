"use client";

import { Pencil, Trash2 } from "lucide-react";
import { VendedorProduct } from "../../hooks/useVendedorProducts";

interface VendedorProductsTableProps {
  products: VendedorProduct[];
  onEdit: (product: VendedorProduct) => void;
  onDelete: (id: string) => void;
}

export default function VendedorProductsTable({ products, onEdit, onDelete }: VendedorProductsTableProps) {
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
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Condición</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {products.map(product => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">{product.name}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{product.price}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{product.stock}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hidden sm:table-cell">{product.category}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm hidden md:table-cell">
                <span className="px-2 py-1 rounded-full text-xs bg-gray-100">{product.condition}</span>
              </td>
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
                    onClick={() => onDelete(product.id)}
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