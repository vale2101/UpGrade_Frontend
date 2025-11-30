"use client";
import { normalizeCondition } from "../../utils/colorMapper";

interface CartConditionDisplayProps {
  condition: string;
  className?: string;
}

export default function CartConditionDisplay({ condition, className = "" }: CartConditionDisplayProps) {
  const normalizedCondition = normalizeCondition(condition);

  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
      normalizedCondition === 'Nuevo' 
        ? 'bg-blue-100 text-blue-800' 
        : normalizedCondition === 'SemiNuevo'
        ? 'bg-purple-100 text-purple-800'
        : 'bg-green-100 text-green-800'
    } ${className}`}>
      {normalizedCondition}
    </span>
  );
}

