"use client";

import { useForm } from "react-hook-form";
import { fichaInterface } from "../interfaces/ficha.interface";

export type FichaFormData = {
  pantalla: string;
  procesador: string;
  camara: string;
  memoria: string;
  sistemaO: string;
  garantia: string;
  estado: string;
};

interface UseFichaFormProps {
  onSave: (ficha: fichaInterface) => Promise<number | null>;
}

export function useFichaForm({ onSave }: UseFichaFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset
  } = useForm<FichaFormData>({
    defaultValues: {
      pantalla: "",
      procesador: "",
      camara: "",
      memoria: "",
      sistemaO: "",
      garantia: "",
      estado: "Activo",
    },
  });

  const onSubmit = async (data: FichaFormData) => {
    const fichaData: fichaInterface = {
      pantalla: data.pantalla,
      procesador: data.procesador,
      camara: data.camara,
      memoria: data.memoria,
      sistemaO: data.sistemaO,
      garantia: data.garantia,
      estado: data.estado,
    };

    const fichaId = await onSave(fichaData);
    
    if (fichaId) {
      reset(); // Limpiar el formulario después de guardar exitosamente
    }
    
    return fichaId;
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control,
    onSubmit,
  };
}

