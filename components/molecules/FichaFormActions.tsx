"use client";

import Button from "../atoms/Button";

interface FichaFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export default function FichaFormActions({
  isSubmitting,
  onCancel,
}: FichaFormActionsProps) {
  return (
    <div className="flex gap-3 pt-4">
      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Crear Ficha Técnica"}
      </Button>
      <Button type="button" fullWidth onClick={onCancel}>
        Cancelar
      </Button>
    </div>
  );
}

