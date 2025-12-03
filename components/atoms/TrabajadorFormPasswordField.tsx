"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TrabajadorFormData } from "../molecules/AdministradorTrabajadorForm";
import TrabajadorFormTextField from "../molecules/TrabajadorFormTextField";

interface TrabajadorFormPasswordFieldProps {
  register: UseFormRegister<TrabajadorFormData>;
  errors: FieldErrors<TrabajadorFormData>;
  isEditMode: boolean;
}

export default function TrabajadorFormPasswordField({
  register,
  errors,
  isEditMode,
}: TrabajadorFormPasswordFieldProps) {
  return (
    <TrabajadorFormTextField
      label={isEditMode ? "Nueva contraseña (dejar vacío para mantener la actual)" : "Contraseña"}
      name="contrasena"
      type="password"
      placeholder={isEditMode ? "Dejar vacío para mantener la actual" : "Ingresa la contraseña"}
      register={register}
      errors={errors}
      required={!isEditMode}
      validationRules={{
        required: isEditMode ? false : "La contraseña es requerida",
        minLength: isEditMode
          ? undefined
          : { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
      }}
    />
  );
}

