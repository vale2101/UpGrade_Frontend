"use client";

import { productoInterface } from "../../interfaces/producto.interface";
import { useEditableStock } from "../../hooks/useEditableStock";
import LoadingState from "../atoms/LoadingState";
import EmptyTableState from "../atoms/EmptyTableState";
import VendedorProductsTableHeader from "./VendedorProductsTableHeader";
import VendedorProductsTableBody from "./VendedorProductsTableBody";

interface VendedorProductsStockTableProps {
  products: productoInterface[];
  onStockUpdate: (id: number, stock: number) => Promise<{ success: boolean }>;
  loading?: boolean;
}

export default function VendedorProductsStockTable({ 
  products, 
  onStockUpdate,
  loading = false 
}: VendedorProductsStockTableProps) {
  const { 
    editingStock, 
    updatingId, 
    handleStockChange, 
    handleStockBlur, 
    handleKeyPress 
  } = useEditableStock();

  const handleProductStockBlur = async (product: productoInterface) => {
    if (!product.id_producto) return;
    await handleStockBlur(product.id_producto, product.stock, onStockUpdate);
  };

  const handleProductKeyPress = (e: React.KeyboardEvent, product: productoInterface) => {
    if (!product.id_producto) return;
    handleKeyPress(e, product.id_producto, product.stock, onStockUpdate);
  };

  if (loading) {
    return <LoadingState message="Cargando productos..." />;
  }

  if (products.length === 0) {
    return <EmptyTableState message="No hay productos registrados" />;
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full min-w-[640px]">
        <VendedorProductsTableHeader />
        <VendedorProductsTableBody
          products={products}
          editingStock={editingStock}
          updatingId={updatingId}
          onStockChange={handleStockChange}
          onStockBlur={handleProductStockBlur}
          onKeyPress={handleProductKeyPress}
        />
      </table>
    </div>
  );
}

