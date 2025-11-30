"use client";

import Button from "../atoms/Button";

interface ProductFormActionsProps {
  isSubmitting: boolean;
  isEditMode: boolean;
  onCancel: () => void;
}

export default function ProductFormActions({
  isSubmitting,
  isEditMode,
  onCancel,
}: ProductFormActionsProps) {
  return (
    <div className="flex gap-3 pt-4">
      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : isEditMode ? "Actualizar" : "Agregar"} Producto
      </Button>
      <Button type="button" fullWidth onClick={onCancel}>
        Cancelar
      </Button>
    </div>
  );
}

