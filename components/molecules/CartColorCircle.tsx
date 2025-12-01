"use client";
import ColorCircle from "../atoms/ColorCircle";

interface CartColorCircleProps {
  color: string;
  size?: number;
  className?: string;
}

export default function CartColorCircle({ color, size = 20, className = "" }: CartColorCircleProps) {
  return <ColorCircle color={color} size={size} className={className} />;
}

