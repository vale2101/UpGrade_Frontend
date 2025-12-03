"use client";

import { useForm } from "react-hook-form";
import { Trabajador, CreateTrabajadorRequest, UpdateTrabajadorRequest } from "../../interfaces/trabajador.interface";
import TrabajadorFormPersonalInfoSection from "./TrabajadorFormPersonalInfoSection";
import TrabajadorFormContactSection from "./TrabajadorFormContactSection";
import TrabajadorFormPasswordField from "../atoms/TrabajadorFormPasswordField";
import TrabajadorFormActions from "../atoms/TrabajadorFormActions";

export interface TrabajadorFormData {
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
  contrasena: string;
}

interface AdministradorTrabajadorFormProps {
  trabajador?: Trabajador | null;
  onSave: (data: CreateTrabajadorRequest | UpdateTrabajadorRequest) => Promise<void>;
  onCancel: () => void;
}

export default function AdministradorTrabajadorForm({ trabajador, onSave, onCancel }: AdministradorTrabajadorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrabajadorFormData>({
    defaultValues: {
      nombre: trabajador?.nombre || "",
      apellido: trabajador?.apellido || "",
      correo: trabajador?.correo || "",
      telefono: trabajador?.telefono || "",
      contrasena: "",
    },
  });

  const onSubmit = async (data: TrabajadorFormData) => {
    const trabajadorData: CreateTrabajadorRequest | UpdateTrabajadorRequest = {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      telefono: data.telefono || undefined,
      ...(data.contrasena && { contrasena: data.contrasena }),
    };
    await onSave(trabajadorData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TrabajadorFormPersonalInfoSection register={register} errors={errors} />
      
      <TrabajadorFormContactSection register={register} errors={errors} />

      <TrabajadorFormPasswordField 
        register={register} 
        errors={errors} 
        isEditMode={!!trabajador}
      />

      <TrabajadorFormActions
        isSubmitting={isSubmitting}
        isEditMode={!!trabajador}
        onCancel={onCancel}
      />
    </form>
  );
}

