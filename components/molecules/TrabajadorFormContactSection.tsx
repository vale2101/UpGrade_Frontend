"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TrabajadorFormData } from "./AdministradorTrabajadorForm";
import TrabajadorFormTextField from "./TrabajadorFormTextField";

interface TrabajadorFormContactSectionProps {
  register: UseFormRegister<TrabajadorFormData>;
  errors: FieldErrors<TrabajadorFormData>;
}

export default function TrabajadorFormContactSection({
  register,
  errors,
}: TrabajadorFormContactSectionProps) {
  return (
    <>
      <TrabajadorFormTextField
        label="Correo electrónico"
        name="correo"
        type="email"
        placeholder="trabajador@ejemplo.com"
        register={register}
        errors={errors}
        required
        validationRules={{
          required: "El correo es requerido",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Correo electrónico inválido",
          },
        }}
      />

      <TrabajadorFormTextField
        label="Teléfono"
        name="telefono"
        type="tel"
        placeholder="Ingresa el teléfono (opcional)"
        register={register}
        errors={errors}
        validationRules={{}}
      />
    </>
  );
}

