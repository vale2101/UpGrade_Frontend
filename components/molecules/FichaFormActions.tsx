"use client";
import FormActions from "./FormActions";

interface FichaFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  isEditMode?: boolean;
}

export default function FichaFormActions({
  isSubmitting,
  onCancel,
  isEditMode = false,
}: FichaFormActionsProps) {
  return (
    <FormActions
      isSubmitting={isSubmitting}
      submitLabel={isEditMode ? "Actualizar Ficha Técnica" : "Crear Ficha Técnica"}
      onCancel={onCancel}
    />
  );
}

