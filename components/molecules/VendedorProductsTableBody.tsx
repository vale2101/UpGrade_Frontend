"use client";

import { productoInterface } from "../../interfaces/producto.interface";
import VendedorProductRow from "./VendedorProductRow";

interface VendedorProductsTableBodyProps {
  products: productoInterface[];
  editingStock: { id: number; stock: number } | null;
  updatingId: number | null;
  onStockChange: (id: number, stock: number) => void;
  onStockBlur: (product: productoInterface) => Promise<void>;
  onKeyPress: (e: React.KeyboardEvent, product: productoInterface) => void;
}

export default function VendedorProductsTableBody({
  products,
  editingStock,
  updatingId,
  onStockChange,
  onStockBlur,
  onKeyPress,
}: VendedorProductsTableBodyProps) {
  return (
    <tbody className="bg-white divide-y">
      {products.map(product => {
        const isEditing = editingStock?.id === product.id_producto;
        const isUpdating = updatingId === product.id_producto;
        const stockValue = isEditing && editingStock ? editingStock.stock : product.stock;

        return (
          <VendedorProductRow
            key={product.id_producto}
            product={product}
            isEditing={isEditing}
            isUpdating={isUpdating}
            stockValue={stockValue}
            editingStock={editingStock}
            onStockChange={onStockChange}
            onStockBlur={onStockBlur}
            onKeyPress={onKeyPress}
          />
        );
      })}
    </tbody>
  );
}

