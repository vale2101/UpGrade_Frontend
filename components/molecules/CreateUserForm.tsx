"use client";

import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { CreateUserFormData } from "../../hooks/useCreateUserForm";
import FormField from "../atoms/FormField";
import FormActions from "./FormActions";

interface CreateUserFormProps {
  register: UseFormRegister<CreateUserFormData>;
  handleSubmit: UseFormHandleSubmit<CreateUserFormData>;
  errors: FieldErrors<CreateUserFormData>;
  isSubmitting: boolean;
  onSubmit: (data: CreateUserFormData) => void;
  onCancel: () => void;
  className?: string;
}

export default function CreateUserForm({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
  onCancel,
  className = ""
}: CreateUserFormProps) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Nombre"
          {...register("nombre", {
            required: "El nombre es requerido",
            minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
          })}
          error={errors.nombre?.message}
          placeholder="Ej: Juan"
          disabled={isSubmitting}
        />

        <FormField
          label="Apellido"
          {...register("apellido", {
            required: "El apellido es requerido",
            minLength: { value: 2, message: "El apellido debe tener al menos 2 caracteres" },
          })}
          error={errors.apellido?.message}
          placeholder="Ej: Pérez"
          disabled={isSubmitting}
        />
      </div>

      <FormField
        label="Correo electrónico"
        type="email"
        {...register("correo", {
          required: "El correo es requerido",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Correo electrónico inválido",
          },
        })}
        error={errors.correo?.message}
        placeholder="Ej: juan@ejemplo.com"
        disabled={isSubmitting}
      />

      <FormField
        label="Contraseña"
        type="password"
        {...register("contrasena", {
          required: "La contraseña es requerida",
          minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
        })}
        error={errors.contrasena?.message}
        placeholder="Mínimo 6 caracteres"
        disabled={isSubmitting}
      />

      <FormField
        label="Teléfono (opcional)"
        type="tel"
        {...register("telefono", {
          pattern: {
            value: /^[0-9+\-\s()]+$/,
            message: "Formato de teléfono inválido",
          },
        })}
        error={errors.telefono?.message}
        placeholder="Ej: +57 300 1234567"
        disabled={isSubmitting}
      />

      <FormActions
        isSubmitting={isSubmitting}
        submitLabel="Crear Usuario"
        cancelLabel="Cancelar"
        onCancel={onCancel}
        className="mt-6"
      />
    </form>
  );
}

