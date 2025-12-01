"use client";
import StepHeader from "../atoms/StepHeader";

interface FichaStepHeaderEditableProps {
  isEditMode?: boolean;
}

export default function FichaStepHeaderEditable({ isEditMode = false }: FichaStepHeaderEditableProps) {
  if (isEditMode) {
    return (
      <StepHeader
        stepNumber={1}
        title="Editar Ficha Técnica"
        description="Modifica los campos de la ficha técnica del producto"
      />
    );
  }

  return (
    <StepHeader
      stepNumber={1}
      title="Crear Ficha Técnica"
      description="Primero necesitas crear la ficha técnica del producto"
    />
  );
}

