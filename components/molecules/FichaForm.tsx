"use client";

import { fichaInterface } from "../../interfaces/ficha.interface";
import { useFichaForm } from "../../hooks/useFichaForm";
import FichaFormField from "./FichaFormField";
import FichaFormEstadoField from "./FichaFormEstadoField";
import FichaFormActions from "./FichaFormActions";

interface FichaFormProps {
  onSave: (ficha: fichaInterface) => Promise<number | null>;
  onCancel: () => void;
  initialFicha?: fichaInterface | null;
}

export default function FichaForm({ onSave, onCancel, initialFicha }: FichaFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control,
    onSubmit,
  } = useFichaForm({ onSave, initialFicha });

  const isEditMode = !!initialFicha?.id_ficha;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FichaFormField
        label="Pantalla"
        name="pantalla"
        placeholder="Ej: 6.8 pulgadas Dynamic AMOLED 120Hz"
        register={register}
        errors={errors}
        validationRules={{
          required: "La pantalla es requerida",
          minLength: { value: 2, message: "La pantalla debe tener al menos 2 caracteres" },
        }}
      />

      <FichaFormField
        label="Procesador"
        name="procesador"
        placeholder="Ej: Snapdragon 8 Gen 2"
        register={register}
        errors={errors}
        validationRules={{
          required: "El procesador es requerido",
          minLength: { value: 2, message: "El procesador debe tener al menos 2 caracteres" },
        }}
      />

      <FichaFormField
        label="Cámara"
        name="camara"
        placeholder="Ej: 200MP + 12MP + 10MP + 10MP"
        register={register}
        errors={errors}
        validationRules={{
          required: "La cámara es requerida",
          minLength: { value: 2, message: "La cámara debe tener al menos 2 caracteres" },
        }}
      />

      <FichaFormField
        label="Memoria"
        name="memoria"
        placeholder="Ej: 256GB"
        register={register}
        errors={errors}
        validationRules={{
          required: "La memoria es requerida",
        }}
      />

      <FichaFormField
        label="Sistema Operativo"
        name="sistemaO"
        placeholder="Ej: Android 14"
        register={register}
        errors={errors}
        validationRules={{
          required: "El sistema operativo es requerido",
        }}
      />

      <FichaFormField
        label="Garantía"
        name="garantia"
        placeholder="Ej: 12 meses"
        register={register}
        errors={errors}
        validationRules={{
          required: "La garantía es requerida",
        }}
      />

      <FichaFormEstadoField control={control} errors={errors} />

      <FichaFormActions 
        isSubmitting={isSubmitting} 
        onCancel={onCancel}
        isEditMode={isEditMode}
      />
    </form>
  );
}

