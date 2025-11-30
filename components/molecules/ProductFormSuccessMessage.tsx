"use client";

interface ProductFormSuccessMessageProps {
  fichaId: number;
}

export default function ProductFormSuccessMessage({ fichaId }: ProductFormSuccessMessageProps) {
  return (
    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-sm text-green-800 font-medium">✓ Ficha técnica creada correctamente</p>
      <p className="text-xs text-green-700 mt-1">
        ID de ficha técnica asignado automáticamente: {fichaId}
      </p>
    </div>
  );
}

