"use client";

import { productoInterface } from "../../interfaces/producto.interface";
import FormattedPrice from "../atoms/FormattedPrice";
import EditableStockInput from "../atoms/EditableStockInput";
import ConditionBadge from "../atoms/ConditionBadge";
import UpdatingIndicator from "../atoms/UpdatingIndicator";
import { normalizeConditionForBadge } from "../../utils/conditionNormalizer";

interface VendedorProductRowProps {
  product: productoInterface;
  isEditing: boolean;
  isUpdating: boolean;
  stockValue: number;
  editingStock: { id: number; stock: number } | null;
  onStockChange: (id: number, stock: number) => void;
  onStockBlur: (product: productoInterface) => Promise<void>;
  onKeyPress: (e: React.KeyboardEvent, product: productoInterface) => void;
}

export default function VendedorProductRow({
  product,
  isEditing,
  isUpdating,
  stockValue,
  onStockChange,
  onStockBlur,
  onKeyPress,
}: VendedorProductRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">
        {product.nombre}
      </td>
      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">
        <FormattedPrice price={product.precio} />
      </td>
      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
        {isUpdating ? (
          <UpdatingIndicator />
        ) : (
          <EditableStockInput
            value={stockValue}
            onChange={(value) => onStockChange(product.id_producto!, value)}
            onBlur={() => onStockBlur(product)}
            onKeyDown={(e) => onKeyPress(e, product)}
            disabled={isUpdating}
          />
        )}
      </td>
      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hidden sm:table-cell">
        {product.categoria}
      </td>
      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm hidden md:table-cell">
        <ConditionBadge condition={normalizeConditionForBadge(product.tipo)} />
      </td>
      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hidden md:table-cell">
        {product.color}
      </td>
      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hidden md:table-cell">
        {product.capacidad}
      </td>
    </tr>
  );
}

