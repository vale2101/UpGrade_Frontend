"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TrabajadorFormData } from "./AdministradorTrabajadorForm";
import TrabajadorFormTextField from "./TrabajadorFormTextField";

interface TrabajadorFormPersonalInfoSectionProps {
  register: UseFormRegister<TrabajadorFormData>;
  errors: FieldErrors<TrabajadorFormData>;
}

export default function TrabajadorFormPersonalInfoSection({
  register,
  errors,
}: TrabajadorFormPersonalInfoSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TrabajadorFormTextField
        label="Nombre"
        name="nombre"
        type="text"
        placeholder="Ingresa el nombre"
        register={register}
        errors={errors}
        required
        validationRules={{
          required: "El nombre es requerido",
          minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
        }}
      />

      <TrabajadorFormTextField
        label="Apellido"
        name="apellido"
        type="text"
        placeholder="Ingresa el apellido"
        register={register}
        errors={errors}
        required
        validationRules={{
          required: "El apellido es requerido",
          minLength: { value: 2, message: "El apellido debe tener al menos 2 caracteres" },
        }}
      />
    </div>
  );
}

