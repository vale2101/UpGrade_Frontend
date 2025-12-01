"use client";
import FormActions from "./FormActions";

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
    <FormActions
      isSubmitting={isSubmitting}
      submitLabel={`${isEditMode ? "Actualizar" : "Agregar"} Producto`}
      onCancel={onCancel}
    />
  );
}

