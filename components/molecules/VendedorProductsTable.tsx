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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condición</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {products.map(product => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.name}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{product.price}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{product.stock}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{product.category}</td>
              <td className="px-4 py-3 text-sm">
                <span className="px-2 py-1 rounded-full text-xs bg-gray-100">{product.condition}</span>
              </td>
              <td className="px-4 py-3 text-sm text-right">
                <button 
                  onClick={() => onEdit(product)}
                  className="text-[#57ad63] hover:text-[#459a52] mr-3"
                >
                  <Pencil size={16} />
                </button>
                <button 
                  onClick={() => onDelete(product.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

