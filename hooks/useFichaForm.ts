"use client";

import { useEffect } from "react";
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
  initialFicha?: fichaInterface | null;
}

export function useFichaForm({ onSave, initialFicha }: UseFichaFormProps) {
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

  // Inicializar el formulario cuando hay una ficha para editar
  useEffect(() => {
    if (initialFicha) {
      reset({
        pantalla: initialFicha.pantalla || "",
        procesador: initialFicha.procesador || "",
        camara: initialFicha.camara || "",
        memoria: initialFicha.memoria || "",
        sistemaO: initialFicha.sistemaO || "",
        garantia: initialFicha.garantia || "",
        estado: initialFicha.estado || "Activo",
      });
    }
  }, [initialFicha, reset]);

  const onSubmit = async (data: FichaFormData) => {
    const fichaData: fichaInterface = {
      ...(initialFicha?.id_ficha && { id_ficha: initialFicha.id_ficha }),
      pantalla: data.pantalla,
      procesador: data.procesador,
      camara: data.camara,
      memoria: data.memoria,
      sistemaO: data.sistemaO,
      garantia: data.garantia,
      estado: data.estado,
    };

    const fichaId = await onSave(fichaData);
    
    if (fichaId && !initialFicha) {
      reset(); // Solo limpiar si es creación nueva
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

