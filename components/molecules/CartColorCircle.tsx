"use client";
import { mapColorToHex } from "../../utils/colorMapper";

interface CartColorCircleProps {
  color: string;
  size?: number;
  className?: string;
}

export default function CartColorCircle({ color, size = 20, className = "" }: CartColorCircleProps) {
  const hexColor = mapColorToHex(color);
  
  return (
    <div 
      className={`rounded-full border-2 border-gray-300 inline-block ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        backgroundColor: hexColor,
        minWidth: `${size}px`,
        minHeight: `${size}px`
      }}
      title={color}
    />
  );
}

