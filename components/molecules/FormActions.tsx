"use client";

import Button from "../atoms/Button";

interface FormActionsProps {
  isSubmitting: boolean;
  submitLabel: string;
  cancelLabel?: string;
  onCancel: () => void;
  className?: string;
}

export default function FormActions({
  isSubmitting,
  submitLabel,
  cancelLabel = "Cancelar",
  onCancel,
  className = "",
}: FormActionsProps) {
  return (
    <div className={`flex gap-3 pt-4 ${className}`}>
      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : submitLabel}
      </Button>
      <Button type="button" fullWidth onClick={onCancel}>
        {cancelLabel}
      </Button>
    </div>
  );
}

