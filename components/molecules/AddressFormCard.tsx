"use client";

import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { direccionInterface } from "../../interfaces/direccion.interface";
import FormField from "../atoms/FormField";

interface AddressFormCardProps {
  register: UseFormRegister<direccionInterface>;
  handleSubmit: UseFormHandleSubmit<direccionInterface>;
  errors: FieldErrors<direccionInterface>;
  isSubmitting: boolean;
  saved: boolean;
  error: string | null;
  onSubmit: (data: direccionInterface) => void;
  className?: string;
}

export default function AddressFormCard({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  saved,
  error,
  onSubmit,
  className = ""
}: AddressFormCardProps) {
  return (
    <div className={`mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50 ${className}`}>
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Nueva dirección</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          label="País"
          {...register("pais", { required: "El país es requerido" })}
          error={errors.pais?.message}
          placeholder="Ej: Colombia"
        />

        <FormField
          label="Departamento"
          {...register("departamento", { required: "El departamento es requerido" })}
          error={errors.departamento?.message}
          placeholder="Ej: Cundinamarca"
        />

        <FormField
          label="Ciudad"
          {...register("ciudad", { required: "La ciudad es requerida" })}
          error={errors.ciudad?.message}
          placeholder="Ej: Bogotá"
        />

        <FormField
          label="Dirección completa"
          {...register("completa", {
            required: "La dirección es requerida",
            minLength: { value: 5, message: "Debe tener al menos 5 caracteres" },
          })}
          error={errors.completa?.message}
          placeholder="Ej: Calle 123 #45-67"
        />

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
          >
            {isSubmitting ? "Guardando..." : "Guardar dirección"}
          </button>
          {saved && (
            <span className="text-green-600 text-xs">✓ Dirección guardada</span>
          )}
        </div>

        {error && (
          <p className="text-red-600 text-xs mt-2">{error}</p>
        )}
      </form>
    </div>
  );
}

