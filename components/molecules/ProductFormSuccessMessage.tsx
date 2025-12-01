"use client";
import SuccessMessage from "../atoms/SuccessMessage";

interface ProductFormSuccessMessageProps {
  fichaId: number;
}

export default function ProductFormSuccessMessage({ fichaId }: ProductFormSuccessMessageProps) {
  return (
    <SuccessMessage
      title="✓ Ficha técnica creada correctamente"
      description={`ID de ficha técnica asignado automáticamente: ${fichaId}`}
      className="mb-6"
    />
  );
}

