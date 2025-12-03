"use client";

import FormActions from "../molecules/FormActions";

interface TrabajadorFormActionsProps {
  isSubmitting: boolean;
  isEditMode: boolean;
  onCancel: () => void;
}

export default function TrabajadorFormActions({
  isSubmitting,
  isEditMode,
  onCancel,
}: TrabajadorFormActionsProps) {
  return (
    <FormActions
      isSubmitting={isSubmitting}
      submitLabel={`${isEditMode ? "Actualizar" : "Crear"} Trabajador`}
      onCancel={onCancel}
    />
  );
}

