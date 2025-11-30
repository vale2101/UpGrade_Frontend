"use client";
import CartConditionDisplay from "./CartConditionDisplay";
import CartColorCircle from "./CartColorCircle";

interface CartProductDetailsProps {
  condition: string;
  capacity: string;
  color: string;
  className?: string;
}

export default function CartProductDetails({ condition, capacity, color, className = "" }: CartProductDetailsProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-xs sm:text-sm text-gray-600">Categoría:</span>
        <CartConditionDisplay condition={condition} />
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-xs sm:text-sm text-gray-600">Capacidad:</span>
        <span className="text-xs sm:text-sm text-gray-900 font-medium">{capacity}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-xs sm:text-sm text-gray-600">Color:</span>
        <CartColorCircle color={color} size={16} />
        <span className="text-xs sm:text-sm text-gray-900 font-medium">{color}</span>
      </div>
    </div>
  );
}

