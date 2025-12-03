"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { reparacionInterface } from "../interfaces/reparacion.interface";
import { ReparacionService } from "../services/reparacionService";
import Swal from "sweetalert2";

export interface RepairFormData {
  nombre: string;
  dispositivo: string;
  observaciones?: string;
  costo: number;
}

interface UseRepairFormProps {
  id_trabajador: number;
  onSuccess?: () => void;
}

export function useRepairForm({ id_trabajador, onSuccess }: UseRepairFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<RepairFormData>({
    defaultValues: {
      nombre: "",
      dispositivo: "",
      observaciones: "",
      costo: 0,
    },
  });

  const onSubmit = async (data: RepairFormData) => {
    if (!data.nombre || data.nombre.trim() === "") {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "El nombre es requerido",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const reparacionData = {
        nombre: data.nombre.trim(),
        dispositivo: data.dispositivo,
        observaciones: data.observaciones || null,
        costo: data.costo,
        id_trabajador: id_trabajador,
      };

      const response = await ReparacionService.createReparacion(reparacionData);

      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Éxito",
          text: response.message || "Reparación creada correctamente",
          timer: 2000,
          showConfirmButton: false,
        });

        reset();
        onSuccess?.();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message || "Error al crear la reparación",
        });
      }
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error inesperado al crear la reparación",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    reset,
    control,
  };
}

